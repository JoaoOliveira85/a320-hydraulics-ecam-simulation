import { useContext } from "react";
import EN from "constants/EN.json";
import { HydraulicContext } from "context";

export const useHydraulicContext = () => {
  const context = useContext(HydraulicContext);
  if (context === undefined) {
    throw new Error(EN.errors.useHydraulicContext);
  }
  return context;
};
