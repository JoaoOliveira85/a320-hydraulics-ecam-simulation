import { Pump, Valve } from "types";

const hydraulicFlow = {
  yellow: 0,
  blue: 0,
  green: 0,
};

const pressures = {
  yellow: 0,
  blue: 0,
  green: 0,
};

const pumps: Pump = {
  engine1: false,
  engine2: false,
  ramAirTurbine: false,
  blueElectricPump: true,
  yellowElectricPump: false,
  powerTransferUnit: true,
};

const valves = {
  engine1: true,
  engine2: true,
};

const MAX_PRESSURE = {
  yellow: 3000,
  blue: 3000,
  green: 3000,
};

const DROP_RATE = {
  yellow: 100,
  blue: 100,
  green: 100,
};

const PUMP_RATE = {
  yellow: 500,
  blue: 500,
  green: 500,
};

const updateLines = () => {
  if (pumps.engine1 && valves.engine1) {
    hydraulicFlow.green = Math.min(
      hydraulicFlow.green + PUMP_RATE.green,
      MAX_PRESSURE.green,
    );
  } else {
    hydraulicFlow.green = Math.max(hydraulicFlow.green - DROP_RATE.green, 0);
  }

  if ((pumps.engine2 && valves.engine2) || pumps.yellowElectricPump) {
    hydraulicFlow.yellow = Math.min(
      hydraulicFlow.yellow + PUMP_RATE.yellow,
      MAX_PRESSURE.yellow,
    );
  } else {
    hydraulicFlow.yellow = Math.max(hydraulicFlow.yellow - DROP_RATE.yellow, 0);
  }

  if (pumps.blueElectricPump || pumps.ramAirTurbine) {
    hydraulicFlow.blue = Math.min(
      hydraulicFlow.blue + PUMP_RATE.blue,
      MAX_PRESSURE.blue,
    );
  } else {
    hydraulicFlow.blue = Math.max(hydraulicFlow.blue - DROP_RATE.blue, 0);
  }

  if (pumps.powerTransferUnit) {
    if (pumps.engine1 && valves.engine1) {
      if (hydraulicFlow.green > hydraulicFlow.yellow) {
        hydraulicFlow.yellow = Math.min(
          hydraulicFlow.yellow + PUMP_RATE.green,
          MAX_PRESSURE.yellow,
        );
      }
    }
    if ((pumps.engine2 && valves.engine2) || pumps.yellowElectricPump) {
      if (hydraulicFlow.yellow > hydraulicFlow.green) {
        hydraulicFlow.green = Math.min(
          hydraulicFlow.green + PUMP_RATE.yellow,
          MAX_PRESSURE.green,
        );
      }
    }
  }

  const output = {
    green: Math.max(hydraulicFlow.green - DROP_RATE.green, 0),
    yellow: Math.max(hydraulicFlow.yellow - DROP_RATE.yellow, 0),
    blue: Math.max(hydraulicFlow.blue - DROP_RATE.blue, 0),
  };

  pressures.yellow = output.yellow;
  pressures.blue = output.blue;
  pressures.green = output.green;
  postMessage({ type: "update", pressures, pumps, valves });
};

setInterval(updateLines, 100);

onmessage = function (event) {
  if (event.data.type === "SET_PUMP_STATE") {
    pumps[event.data.pump as keyof Pump] = event.data.state;
  }
  if (event.data.type === "SET_VALVE_STATE") {
    valves[event.data.valve as keyof Valve] = event.data.state;
  }
};
