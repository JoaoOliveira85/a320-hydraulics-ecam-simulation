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
  pumps: Record<TypesOfPumps, boolean>;
  valves: Record<TypesOfValves, boolean>;
}
