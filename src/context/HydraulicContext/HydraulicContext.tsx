import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { TypesOfPumps, TypesOfValves } from "types";
import HydraulicWorker from "workers/hydraulicsWorker.js?worker";

import { HydraulicContextType } from "types";

const HydraulicContext = createContext<HydraulicContextType | undefined>(
  undefined,
);

interface HydraulicProviderProps {
  children: ReactNode;
  initialState?: Partial<HydraulicContextType>;
}

export const HydraulicProvider = ({
  children,
  initialState = {},
}: HydraulicProviderProps) => {
  const [pressures, setPressures] = useState({
    green: initialState?.pressures?.green ?? 0,
    blue: initialState?.pressures?.blue ?? 0,
    yellow: initialState?.pressures?.yellow ?? 0,
  });

  const [pumps, setPumps] = useState({
    engine1: initialState?.pumps?.engine1 ?? false,
    engine2: initialState?.pumps?.engine2 ?? false,
    powerTransferUnit: initialState?.pumps?.powerTransferUnit ?? true,
    ramAirTurbine: initialState?.pumps?.ramAirTurbine ?? false,
    blueElectricPump: initialState?.pumps?.blueElectricPump ?? true,
    yellowElectricPump: initialState?.pumps?.yellowElectricPump ?? false,
  });

  const [valves, setValves] = useState({
    engine1: initialState?.valves?.engine1 ?? true,
    engine2: initialState?.valves?.engine2 ?? true,
  });

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hydraulicWorker = new HydraulicWorker();
      workerRef.current = hydraulicWorker;

      hydraulicWorker.onmessage = (event) => {
        const newPressures = event.data.pressures;
        setPressures((prevPressures) => {
          if (
            newPressures.green !== prevPressures.green ||
            newPressures.blue !== prevPressures.blue ||
            newPressures.yellow !== prevPressures.yellow
          ) {
            return newPressures;
          }
          return prevPressures;
        });
      };

      return () => {
        hydraulicWorker.terminate();
      };
    }
  }, []);

  const setPumpState = (pump: TypesOfPumps, state: boolean) => {
    if (workerRef.current) {
      workerRef.current.postMessage({ type: "SET_PUMP_STATE", pump, state });
    }
  };

  const setValveState = (valve: TypesOfValves, state: boolean) => {
    if (workerRef.current) {
      workerRef.current.postMessage({ type: "SET_VALVE_STATE", valve, state });
    }
  };

  const handlePumpButton = useCallback((button: TypesOfPumps) => {
    setPumps((prevPumps) => {
      const newState = !prevPumps[button];
      setPumpState(button, newState);
      return { ...prevPumps, [button]: newState };
    });
  }, []);

  const handleValveButton = useCallback((button: TypesOfValves) => {
    setValves((prevValves) => {
      const newState = !prevValves[button];
      setValveState(button, newState);
      return { ...prevValves, [button]: newState };
    });
  }, []);

  const controls = {
    handlePumpButton,
    handleValveButton,
  };

  return (
    <HydraulicContext.Provider value={{ pressures, pumps, valves, controls }}>
      {children}
    </HydraulicContext.Provider>
  );
};

export const useHydraulicContext = () => {
  const context = useContext(HydraulicContext);
  if (context === undefined) {
    throw new Error("useHydraulic must be used within a HydraulicProvider");
  }
  return context;
};
