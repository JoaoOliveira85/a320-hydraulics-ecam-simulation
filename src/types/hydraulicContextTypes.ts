import { TypesOfPumps, TypesOfValves } from "types";

export interface HydraulicContextType {
  pressures: {
    green: number;
    blue: number;
    yellow: number;
  };
  controls: {
    handlePumpButton: (button: TypesOfPumps) => void;
    handleValveButton: (button: TypesOfValves) => void;
  };
  pumps: {
    engine1: boolean;
    engine2: boolean;
    powerTransferUnit: boolean;
    ramAirTurbine: boolean;
    blueElectricPump: boolean;
    yellowElectricPump: boolean;
  };
  valves: {
    engine1: boolean;
    engine2: boolean;
  };
}
