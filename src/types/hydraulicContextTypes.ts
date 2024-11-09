import { TypesOfPumps, TypesOfValves, TypesOfPtus } from "types";

export enum Colors {
  green = "green",
  blue = "blue",
  yellow = "yellow",
}

export type Color = keyof typeof Colors;

export interface HydraulicContextType {
  pressures: {
    green: number;
    blue: number;
    yellow: number;
  };
  reservoires: {
    green: number;
    blue: number;
    yellow: number;
  };
  simControls: {
    resetSimulation: () => void;
    updateSettings: (settings: SimulationSettings) => void;
  };
  controls: {
    handlePumpButton: (button: TypesOfPumps) => void;
    handleValveButton: (button: TypesOfValves) => void;
    handlePtuButton: (button: TypesOfPtus) => void;
  };
  failures: {
    handlePumpFailure: (pump: TypesOfPumps) => void;
    handleValveFailure: (valve: TypesOfValves) => void;
    handleLineLeak: (line: Colors) => void;
  }
  pumps: Record<TypesOfPumps, boolean>;
  valves: Record<TypesOfValves, boolean>;
  ptus: Record<TypesOfPtus, boolean>;
  other: {
    hydraulicLineMaxPressure: number;
    ptuThreshold: number;
    airTemperature: number;
    status: boolean;
    speed: number;
    grossWeight: number;
  };
}

export type SimulationSettings = {
  reservoireStartingLevels: Record<Color, number>;
  reservoireLeakageRates: Record<Color, number>;
  pumpMaxFlowRates: {
    engine1: number;
    engine2: number;
    blueElectricPump: number;
    yellowElectricPump: number;
    ramAirTurbine: number;
  };
  other: {
    hydraulicLineMaxPressure: number;
    ptuThreshold: number;
    airTemperature: number;
    status: boolean;
    speed: number;
    grossWeight: number;
  };
};
