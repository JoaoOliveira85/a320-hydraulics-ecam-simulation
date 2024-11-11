import EN from "constants/EN.json";
import { HydraulicContextType } from "types";

export const useHydraulicContext = (context?: HydraulicContextType) => {
  if (context === undefined) {
    throw new Error(EN.errors.useHydraulicContext);
  }
  return context;
};
