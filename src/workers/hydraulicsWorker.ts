import { TypesOfPumps, TypesOfValves, SimulationSettings, Color } from "types";
import simulationSettings from "./simulationDefaultSettings.json";
import { WorkerActions } from "types/hydraulicWorkerTypes";

const DEFAULT_SETTINGS = JSON.parse(
  JSON.stringify(simulationSettings),
) as typeof simulationSettings;

const MIN_TICK_MS = 10;

const tickInterval = (speed: number) =>
  Number.isFinite(speed) && speed > 0
    ? Math.max(MIN_TICK_MS, speed)
    : DEFAULT_SETTINGS.other.speed;

const TEMPERATURE_EFFECTS = {
  optimalTemp: 20,
  tempRange: 15,
  minFactor: 0.5,
};

const applySettings = (
  simulationSettings: SimulationSettings,
  hydraulicSystem: HydraulicSystemController[],
) => {
  const { reservoireLeakageRates, pumpMaxFlowRates, other } =
    simulationSettings;

  hydraulicSystem[0].reservoires.green.leakageRate =
    reservoireLeakageRates.green;
  hydraulicSystem[0].reservoires.yellow.leakageRate =
    reservoireLeakageRates.yellow;
  hydraulicSystem[0].reservoires.blue.leakageRate = reservoireLeakageRates.blue;

  hydraulicSystem[0].pumps.engine1.maxFlowRate = pumpMaxFlowRates.engine1;
  hydraulicSystem[0].pumps.engine2.maxFlowRate = pumpMaxFlowRates.engine2;
  hydraulicSystem[0].pumps.blueElectricPump.maxFlowRate =
    pumpMaxFlowRates.blueElectricPump;
  hydraulicSystem[0].pumps.yellowElectricPump.maxFlowRate =
    pumpMaxFlowRates.yellowElectricPump;
  hydraulicSystem[0].pumps.ramAirTurbine.maxFlowRate =
    pumpMaxFlowRates.ramAirTurbine;

  hydraulicSystem[0].lines.green.maxPressure = other.hydraulicLineMaxPressure;
  hydraulicSystem[0].lines.yellow.maxPressure = other.hydraulicLineMaxPressure;
  hydraulicSystem[0].lines.blue.maxPressure = other.hydraulicLineMaxPressure;

  hydraulicSystem[0].ptu.threshold = other.ptuThreshold;
  hydraulicSystem[0].applyTemperatureEffects(other.airTemperature);
  hydraulicSystem[0].applySettings(simulationSettings);

  hydraulicSystem[0].setSimulationSpeed(other.speed);
};

class Reservoir {
  currentLevel: number;
  capacity: number;
  leakageRate: number;
  hasFailed: boolean;

  constructor(capacity: number, leakageRate: number) {
    this.hasFailed = false;
    this.capacity = capacity;
    this.currentLevel = capacity;
    this.leakageRate = leakageRate;
  }

  fail() {
    this.hasFailed = true;
  }

  leak() {
    if (this.hasFailed) {
      this.currentLevel = Math.max(
        0,
        this.currentLevel - this.leakageRate * 50,
      );
    } else {
      this.currentLevel = Math.max(0, this.currentLevel - this.leakageRate);
    }
  }

  isEmpty() {
    return this.currentLevel <= 0;
  }

  consumeFluid(amount: number) {
    if (this.currentLevel > amount) {
      this.currentLevel -= amount;
      return true;
    } else {
      this.currentLevel = 0;
      return false;
    }
  }
}

class Pump {
  isActive: boolean;
  maxFlowRate: number;
  currentPressure: number;
  rampUpRate: number;
  reservoire: Reservoir | undefined;
  baseFlowRate: number;
  baseRampUpRate: number;
  hasFailed: boolean;
  pumpTemperature: number;

  constructor(maxFlowRate: number, reservoire?: Reservoir, isActive = true) {
    this.isActive = isActive;
    this.hasFailed = false;
    this.maxFlowRate = maxFlowRate;
    this.baseFlowRate = maxFlowRate;
    this.currentPressure = 0;
    this.rampUpRate = 100;
    this.baseRampUpRate = 100;
    this.reservoire = reservoire;
    this.pumpTemperature = simulationSettings.other.airTemperature;
  }

  start() {
    this.isActive = true;
  }

  stop() {
    this.isActive = false;
  }

  fail() {
    this.hasFailed = true;
  }

  adjustByTemperature(temperature: number) {
    const temperatureFactor =
      TEMPERATURE_EFFECTS.minFactor +
      (1 - TEMPERATURE_EFFECTS.minFactor) *
        Math.exp(
          -((temperature - TEMPERATURE_EFFECTS.optimalTemp) ** 2) /
            (2 * TEMPERATURE_EFFECTS.tempRange ** 2),
        );

    this.maxFlowRate = this.baseFlowRate * temperatureFactor;
    this.rampUpRate = this.baseRampUpRate * temperatureFactor;
  }

  calculateOutput(linePressure: number) {
    if (!this.isActive || this.reservoire?.isEmpty() || this.hasFailed) {
      this.currentPressure = Math.max(
        this.currentPressure - this.rampUpRate,
        0,
      );
    } else {
      this.currentPressure = Math.min(
        this.currentPressure + this.rampUpRate,
        this.maxFlowRate,
      );
    }

    const pressureDifference = this.currentPressure - linePressure;
    const outputFlow = pressureDifference > 0 ? pressureDifference : 0;

    return Math.min(outputFlow, this.maxFlowRate);
  }
}

class Valve {
  isOpen: boolean;
  resistance: number;
  hasFailed: boolean;
  constructor(isOpen = true) {
    this.isOpen = isOpen;
    this.resistance = 0.1;
    this.hasFailed = false;
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  fail() {
    this.hasFailed = true;
  }

  calculateFlow(inputFlow: number) {
    return this.isOpen && !this.hasFailed
      ? inputFlow * (1 - this.resistance)
      : 0;
  }
}

class HydraulicLine {
  currentPressure: number;
  maxPressure: number;
  baseDropRate: number;
  dropRate: number;
  hasFailed: boolean;

  constructor() {
    this.currentPressure = 0;
    this.maxPressure = simulationSettings.other.hydraulicLineMaxPressure;
    this.baseDropRate = 100;
    this.dropRate = this.baseDropRate;
    this.hasFailed = false;
  }

  adjustByTemperature(temperature: number) {
    const temperatureFactor =
      TEMPERATURE_EFFECTS.minFactor +
      (1 - TEMPERATURE_EFFECTS.minFactor) *
        Math.exp(
          -((temperature - TEMPERATURE_EFFECTS.optimalTemp) ** 2) /
            (2 * TEMPERATURE_EFFECTS.tempRange ** 2),
        );

    this.dropRate = this.baseDropRate * temperatureFactor;
  }

  updatePressure(inputFlow: number, applyDrop = true) {
    const drop = applyDrop ? this.dropRate : 0;
    this.currentPressure = Math.max(
      0,
      Math.min(this.currentPressure + inputFlow - drop, this.maxPressure),
    );
  }
}

class PowerTransferUnit {
  isActive: boolean;
  threshold: number;

  constructor() {
    this.isActive = simulationSettings.ptuStartStatus;
    this.threshold = simulationSettings.other.ptuThreshold;
  }

  start() {
    this.isActive = true;
  }

  stop() {
    this.isActive = false;
  }

  checkAndTransfer(pressureGreen: number, pressureYellow: number) {
    if (
      this.isActive &&
      Math.abs(pressureGreen - pressureYellow) > this.threshold
    ) {
      return pressureGreen > pressureYellow
        ? { greenToYellow: true }
        : { yellowToGreen: true };
    }
    return { greenToYellow: false, yellowToGreen: false };
  }
}

class HydraulicSystemController {
  pressures = {
    yellow: 0,
    blue: 0,
    green: 0,
  };
  pumps: Record<TypesOfPumps, Pump>;
  reservoires: Record<Color, Reservoir>;
  valves: Record<TypesOfValves, Valve>;
  lines: Record<Color, HydraulicLine>;
  ptu: PowerTransferUnit;
  PTU_TRANSFER_RATE = 500;

  constructor() {
    this.reservoires = {
      green: new Reservoir(
        simulationSettings.reservoireStartingLevels.green,
        simulationSettings.reservoireLeakageRates.green,
      ),
      yellow: new Reservoir(
        simulationSettings.reservoireStartingLevels.yellow,
        simulationSettings.reservoireLeakageRates.yellow,
      ),
      blue: new Reservoir(
        simulationSettings.reservoireStartingLevels.blue,
        simulationSettings.reservoireLeakageRates.blue,
      ),
    };

    this.pumps = {
      engine1: new Pump(
        simulationSettings.pumpMaxFlowRates.engine1,
        this.reservoires.green,
        simulationSettings.engineStartStatus.engine1,
      ),
      engine2: new Pump(
        simulationSettings.pumpMaxFlowRates.engine2,
        this.reservoires.yellow,
        simulationSettings.engineStartStatus.engine2,
      ),
      blueElectricPump: new Pump(
        simulationSettings.pumpMaxFlowRates.blueElectricPump,
        this.reservoires.blue,
        simulationSettings.pumpStartStatus.blueElectricPump,
      ),
      yellowElectricPump: new Pump(
        simulationSettings.pumpMaxFlowRates.yellowElectricPump,
        this.reservoires.yellow,
        simulationSettings.pumpStartStatus.yellowElectricPump,
      ),
      ramAirTurbine: new Pump(
        simulationSettings.pumpMaxFlowRates.ramAirTurbine,
        this.reservoires.blue,
        simulationSettings.pumpStartStatus.ramAirTurbine,
      ),
    };

    this.valves = {
      engine1: new Valve(simulationSettings.valveStartStatus.green),
      engine2: new Valve(simulationSettings.valveStartStatus.yellow),
    };

    this.lines = {
      green: new HydraulicLine(),
      yellow: new HydraulicLine(),
      blue: new HydraulicLine(),
    };

    this.ptu = new PowerTransferUnit();

    this.applyTemperatureEffects(simulationSettings.other.airTemperature);
  }

  applyTemperatureEffects(temperature: number) {
    Object.values(this.pumps).forEach((pump) =>
      pump.adjustByTemperature(temperature),
    );
    Object.values(this.lines).forEach((line) =>
      line.adjustByTemperature(temperature),
    );
  }

  setSimulationSpeed = (speed: number) => {
    clearInterval(simulationInterval);
    simulationInterval = setInterval(() => {
      if (simulationSettings.other.status) hydraulicSystem[0].update();
    }, tickInterval(speed));
  };

  applySettings(settings: SimulationSettings) {
    const { other } = settings;
    this.lines.green.maxPressure = other.hydraulicLineMaxPressure;
    this.lines.yellow.maxPressure = other.hydraulicLineMaxPressure;
    this.lines.blue.maxPressure = other.hydraulicLineMaxPressure;

    this.ptu.threshold = other.ptuThreshold;
    this.applyTemperatureEffects(other.airTemperature);
  }

  update() {
    this.reservoires.green.leak();
    this.reservoires.yellow.leak();
    this.reservoires.blue.leak();

    const greenFlow = this.valves.engine1.calculateFlow(
      this.pumps.engine1.calculateOutput(this.lines.green.currentPressure),
    );
    const yellowFlow =
      this.valves.engine2.calculateFlow(
        this.pumps.engine2.calculateOutput(this.lines.yellow.currentPressure),
      ) +
      this.pumps.yellowElectricPump.calculateOutput(
        this.lines.yellow.currentPressure,
      );
    const blueFlow = this.pumps.blueElectricPump.calculateOutput(
      this.lines.blue.currentPressure,
    );

    if (this.ptu.isActive) {
      const ptuTransfer = this.ptu.checkAndTransfer(
        this.lines.green.currentPressure,
        this.lines.yellow.currentPressure,
      );

      if (ptuTransfer.greenToYellow) {
        const pressureDifference =
          this.lines.green.currentPressure - this.lines.yellow.currentPressure;
        const transferFlow = Math.min(
          this.PTU_TRANSFER_RATE,
          Math.abs(pressureDifference),
        );
        this.lines.green.updatePressure(-transferFlow, false);
        this.lines.yellow.updatePressure(transferFlow, false);
      } else if (ptuTransfer.yellowToGreen) {
        const pressureDifference =
          this.lines.yellow.currentPressure - this.lines.green.currentPressure;
        const transferFlow = Math.min(
          this.PTU_TRANSFER_RATE,
          Math.abs(pressureDifference),
        );
        this.lines.yellow.updatePressure(-transferFlow, false);
        this.lines.green.updatePressure(transferFlow, false);
      }
    }

    if (this.pumps.ramAirTurbine.isActive) {
      this.lines.blue.updatePressure(
        this.pumps.ramAirTurbine.calculateOutput(
          this.lines.blue.currentPressure,
        ),
        false,
      );
    }

    this.lines.green.updatePressure(greenFlow);
    this.lines.yellow.updatePressure(yellowFlow);
    this.lines.blue.updatePressure(blueFlow);

    this.pressures.green = this.lines.green.currentPressure;
    this.pressures.yellow = this.lines.yellow.currentPressure;
    this.pressures.blue = this.lines.blue.currentPressure;

    this.displayStatus();
  }

  displayStatus() {
    postMessage({
      type: "update",
      pressures: {
        green: Math.floor(this.pressures.green),
        yellow: Math.floor(this.pressures.yellow),
        blue: Math.floor(this.pressures.blue),
      },
      pumps: {
        green: this.pumps.engine1.isActive,
        yellow: this.pumps.engine2.isActive,
        blue: this.pumps.blueElectricPump.isActive,
      },
      valves: {
        green: this.valves.engine1.isOpen,
        yellow: this.valves.engine2.isOpen,
      },
      reservoires: {
        green: this.reservoires.green.currentLevel,
        yellow: this.reservoires.yellow.currentLevel,
        blue: this.reservoires.blue.currentLevel,
      },
      ptuActive: this.ptu.isActive,
      settings: simulationSettings,
      failures: {
        reservoires: {
          green: this.reservoires.green.hasFailed,
          yellow: this.reservoires.yellow.hasFailed,
          blue: this.reservoires.blue.hasFailed,
        },
        pumps: {
          green: this.pumps.engine1.hasFailed,
          yellow: this.pumps.engine2.hasFailed,
          blue: this.pumps.blueElectricPump.hasFailed,
        },
        valves: {
          green: this.valves.engine1.hasFailed,
          yellow: this.valves.engine2.hasFailed,
        },
        lines: {
          green: this.lines.green.hasFailed,
          yellow: this.lines.yellow.hasFailed,
          blue: this.lines.blue.hasFailed,
        },
      },
    });
  }
}

const hydraulicSystem = [new HydraulicSystemController()];

let simulationInterval = setInterval(() => {
  if (simulationSettings.other.status) hydraulicSystem[0].update();
}, tickInterval(simulationSettings.other.speed));

const resetSimulation = () => {
  clearInterval(simulationInterval);
  Object.assign(
    simulationSettings,
    JSON.parse(JSON.stringify(DEFAULT_SETTINGS)),
  );
  hydraulicSystem.pop();
  hydraulicSystem.push(new HydraulicSystemController());
  simulationInterval = setInterval(() => {
    if (simulationSettings.other.status) hydraulicSystem[0].update();
  }, tickInterval(simulationSettings.other.speed));
};

type Event = {
  data: {
    type: WorkerActions;
    pump: TypesOfPumps;
    state: boolean;
    valve: TypesOfValves;
    settings: SimulationSettings;
    line: Color;
    reservoir: Color;
  };
};

onmessage = function (event: Event) {
  switch (event.data.type) {
    case WorkerActions.UPDATE_SETTINGS:
      Object.assign(simulationSettings, event.data.settings);
      applySettings(simulationSettings, hydraulicSystem);
      break;

    case WorkerActions.SET_PUMP_STATE: {
      const pump = hydraulicSystem[0].pumps[event.data.pump];
      if (event.data.state) {
        pump.start();
      } else {
        pump.stop();
      }
      break;
    }

    case WorkerActions.SET_VALVE_STATE: {
      const valve = hydraulicSystem[0].valves[event.data.valve];
      if (event.data.state) {
        valve.open();
      } else {
        valve.close();
      }
      break;
    }

    case WorkerActions.SET_PTU_STATE:
      if (event.data.state) {
        hydraulicSystem[0].ptu.start();
      } else {
        hydraulicSystem[0].ptu.stop();
      }
      break;

    case WorkerActions.RESET_SIMULATION:
      resetSimulation();
      break;

    case WorkerActions.TRIGGER_FAILURE: {
      const { pump, valve, line } = event.data;
      if (pump) {
        hydraulicSystem[0].pumps[pump].fail();
      } else if (valve) {
        hydraulicSystem[0].valves[valve].fail();
      } else if (line) {
        hydraulicSystem[0].reservoires[line].fail();
      }
      break;
    }

    default:
      console.warn(`Unknown message type: ${event.data.type}`);
  }
};
