import { createContext } from "react";
import { HydraulicContextType } from "types";

export const HydraulicContext = createContext<HydraulicContextType | undefined>(
  undefined,
);
