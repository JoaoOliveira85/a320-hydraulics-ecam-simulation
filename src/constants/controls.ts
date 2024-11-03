import { ButtonElement, Pumps, ValveElement, Valves } from "types";
import EN from "constants/EN.json";

const {
  overhead_panel: {
    instruments: { hydraulic_pumps, valves },
  },
} = EN;

export const buttonList: Array<ButtonElement> = [
  {
    id: "eng1-pump",
    label: hydraulic_pumps["eng1-pump"],
    operation: Pumps.engine1,
  },
  {
    id: "elec-pump",
    label: hydraulic_pumps["elec-pump"],
    operation: Pumps.blueElectricPump,
  },
  {
    id: "eng2-pump",
    label: hydraulic_pumps["eng2-pump"],
    operation: Pumps.engine2,
  },
  {
    id: "rat-man-on",
    label: hydraulic_pumps["rat-man-on"],
    operation: Pumps.ramAirTurbine,
  },
  {
    id: "ptu-auto",
    label: hydraulic_pumps["ptu-auto"],
    operation: Pumps.powerTransferUnit,
  },
  {
    id: "elec-pump-2",
    label: hydraulic_pumps["elec-pump-2"],
    operation: Pumps.yellowElectricPump,
  },
];

export const ValveList: Array<ValveElement> = [
  { id: "eng1-valve", label: valves["eng1-valve"], operation: Valves.engine1 },
  { id: "eng2-valve", label: valves["eng2-valve"], operation: Valves.engine2 },
];
