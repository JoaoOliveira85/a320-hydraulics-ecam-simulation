export enum Pumps {
  engine1 = "engine1",
  engine2 = "engine2",
  powerTransferUnit = "powerTransferUnit",
  ramAirTurbine = "ramAirTurbine",
  blueElectricPump = "blueElectricPump",
  yellowElectricPump = "yellowElectricPump",
}

export enum Valves {
  engine1 = "engine1",
  engine2 = "engine2",
}

export type TypesOfPumps = keyof typeof Pumps;
export type TypesOfValves = keyof typeof Valves;

export interface ButtonElement {
  id: string;
  label: string;
  operation: TypesOfPumps;
}

export interface ValveElement {
  id: string;
  label: string;
  operation: TypesOfValves;
}
export interface Pump {
  [Pumps.engine1]: boolean;
  [Pumps.engine2]: boolean;
  [Pumps.powerTransferUnit]: boolean;
  [Pumps.ramAirTurbine]: boolean;
  [Pumps.blueElectricPump]: boolean;
  [Pumps.yellowElectricPump]: boolean;
}

export interface Valve {
  [Valves.engine1]: boolean;
  [Valves.engine2]: boolean;
}

export interface OverheadPanelProps {
  handlePumpButton: (button: TypesOfPumps) => void;
  handleValveButton: (button: TypesOfValves) => void;
}
