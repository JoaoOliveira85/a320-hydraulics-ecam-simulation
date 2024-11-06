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
export type Pump = Record<TypesOfPumps, boolean>;

export type Valve = Record<TypesOfValves, boolean>;

export interface OverheadPanelProps {
  handlePumpButton: (button: TypesOfPumps) => void;
  handleValveButton: (button: TypesOfValves) => void;
}
