export enum Pumps {
  engine1 = "engine1",
  engine2 = "engine2",
  ramAirTurbine = "ramAirTurbine",
  blueElectricPump = "blueElectricPump",
  yellowElectricPump = "yellowElectricPump",
}

export enum Valves {
  engine1 = "engine1",
  engine2 = "engine2",
}

export enum Ptus {
  powerTransferUnit = "powerTransferUnit",
}

export type TypesOfPumps = keyof typeof Pumps;
export type TypesOfValves = keyof typeof Valves;
export type TypesOfPtus = keyof typeof Ptus;

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

export interface PtusElement {
  id: string;
  label: string;
  operation: TypesOfPtus;
}

export type Pump = Record<TypesOfPumps, boolean>;

export type Valve = Record<TypesOfValves, boolean>;

export type Ptu = Record<TypesOfPtus, boolean>;

export interface OverheadPanelProps {
  handlePumpButton: (button: TypesOfPumps) => void;
  handleValveButton: (button: TypesOfValves) => void;
  handlePtuButton: (button: TypesOfPtus) => void;
}
