import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  TypesOfPumps,
  TypesOfValves,
  HydraulicContextType,
  TypesOfPtus,
  SimulationSettings,
  Color,
} from "types";
import { WorkerActions } from "types/hydraulicWorkerTypes";
import HydraulicWorker from "workers/hydraulicsWorker.js?worker";
import defaultSettings from "workers/simulationDefaultSettings.json";
import EN from "constants/EN.json";

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
  const [reservoires, setReservoires] = useState({
    green:
      initialState?.reservoires?.green ??
      defaultSettings.reservoireStartingLevels.green,
    blue:
      initialState?.reservoires?.blue ??
      defaultSettings.reservoireStartingLevels.blue,
    yellow:
      initialState?.reservoires?.yellow ??
      defaultSettings.reservoireStartingLevels.yellow,
  });

  const [pumps, setPumps] = useState({
    engine1:
      initialState?.pumps?.engine1 ?? defaultSettings.engineStartStatus.engine1,
    engine2:
      initialState?.pumps?.engine2 ?? defaultSettings.engineStartStatus.engine2,
    ramAirTurbine:
      initialState?.pumps?.ramAirTurbine ??
      defaultSettings.pumpStartStatus.ramAirTurbine,
    blueElectricPump:
      initialState?.pumps?.blueElectricPump ??
      defaultSettings.pumpStartStatus.blueElectricPump,
    yellowElectricPump:
      initialState?.pumps?.yellowElectricPump ??
      defaultSettings.pumpStartStatus.yellowElectricPump,
  });

  const [ptus, setPtus] = useState({
    powerTransferUnit:
      initialState?.ptus?.powerTransferUnit ?? defaultSettings.ptuStartStatus,
  });

  const [valves, setValves] = useState({
    engine1:
      initialState?.valves?.engine1 ?? defaultSettings.valveStartStatus.green,
    engine2:
      initialState?.valves?.engine2 ?? defaultSettings.valveStartStatus.yellow,
  });

  const [other, setOther] = useState({
    airTemperature:
      initialState?.other?.airTemperature ??
      defaultSettings.other.airTemperature,
    grossWeight:
      initialState?.other?.grossWeight ?? defaultSettings.other.grossWeight,
    hydraulicLineMaxPressure:
      initialState?.other?.hydraulicLineMaxPressure ??
      defaultSettings.other.hydraulicLineMaxPressure,
    ptuThreshold:
      initialState?.other?.ptuThreshold ?? defaultSettings.other.ptuThreshold,
    status: initialState?.other?.status ?? defaultSettings.other.status,
    speed: initialState?.other?.speed ?? defaultSettings.other.speed,
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

        const newReservoires = event.data.reservoires;
        setReservoires((prevReservoires) => {
          if (
            newReservoires.green !== prevReservoires.green ||
            newReservoires.blue !== prevReservoires.blue ||
            newReservoires.yellow !== prevReservoires.yellow
          ) {
            return newReservoires;
          }
          return prevReservoires;
        });

        const settings = event.data.settings.other;

        setOther((prevOther) => {
          if (
            settings.airTemperature !== prevOther.airTemperature ||
            settings.grossWeight !== prevOther.grossWeight ||
            settings.hydraulicLineMaxPressure !==
              prevOther.hydraulicLineMaxPressure ||
            settings.ptuThreshold !== prevOther.ptuThreshold ||
            settings.status !== prevOther.status ||
            settings.speed !== prevOther.speed
          ) {
            return settings;
          }
          return prevOther;
        });
      };

      return () => {
        hydraulicWorker.terminate();
      };
    }
  }, []);

  const setPumpState = (pump: TypesOfPumps, state: boolean) => {
    if (workerRef.current) {
      workerRef.current.postMessage({
        type: WorkerActions.SET_PUMP_STATE,
        pump,
        state,
      });
    }
  };

  const setValveState = (valve: TypesOfValves, state: boolean) => {
    if (workerRef.current) {
      workerRef.current.postMessage({
        type: WorkerActions.SET_VALVE_STATE,
        valve,
        state,
      });
    }
  };

  const setPtuState = (ptu: TypesOfPtus, state: boolean) => {
    if (workerRef.current) {
      workerRef.current.postMessage({
        type: WorkerActions.SET_PTU_STATE,
        ptu,
        state,
      });
    }
  };

  const updateSettings = (settings: SimulationSettings) => {
    if (workerRef.current) {
      workerRef.current.postMessage({
        type: WorkerActions.UPDATE_SETTINGS,
        settings,
      });
    }
  };

  const resetSimulation = () => {
    if (workerRef.current) {
      workerRef.current.postMessage({ type: WorkerActions.RESET_SIMULATION });
    }
  };

  const triggerFailure = (failure: string, id: string) => {
    if (workerRef.current) {
      workerRef.current.postMessage({
        type: WorkerActions.TRIGGER_FAILURE,
        [failure]: id
      });
    }
  }

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

  const handlePtuButton = useCallback((button: TypesOfPtus) => {
    setPtus((prevPtus) => {
      const newState = !prevPtus.powerTransferUnit;
      setPtuState(button, newState);
      return { ...prevPtus, powerTransferUnit: newState };
    });
  }, []);

  const handleValveFailure = useCallback((valve: TypesOfValves) => {
    triggerFailure('valve', valve);
  }, []);

  const handlePumpFailure = useCallback((pump: TypesOfPumps) => {
    triggerFailure('pump', pump);
  }, []);

  const handleLineLeak = useCallback((line: Color) => {
    triggerFailure('line', line);
  }, []);

  const controls = {
    handlePumpButton,
    handleValveButton,
    handlePtuButton,
  };

  const simControls = {
    updateSettings,
    resetSimulation,
  };

  const failures = {
    handlePumpFailure,
    handleValveFailure,
    handleLineLeak,
  };

  const values = useMemo(
    () => ({
      pressures,
      reservoires: {
        green:
          (reservoires.green / defaultSettings.reservoireMaxLevels.green) * 100,
        blue:
          (reservoires.blue / defaultSettings.reservoireMaxLevels.blue) * 100,
        yellow:
          (reservoires.yellow / defaultSettings.reservoireMaxLevels.yellow) *
          100,
      },
      simControls: {
        updateSettings,
        resetSimulation,
      },
      controls: {
        handlePumpButton: controls.handlePumpButton,
        handleValveButton: controls.handleValveButton,
        handlePtuButton: controls.handlePtuButton,
      },
      pumps,
      valves,
      ptus,
      other,
      failures,
    }),
    [
      pressures,
      reservoires,
      simControls.updateSettings,
      simControls.resetSimulation,
      controls.handlePumpButton,
      controls.handleValveButton,
      controls.handlePtuButton,
      pumps,
      valves,
      ptus,
      other,
      failures     
    ],
  );

  return (
    <HydraulicContext.Provider value={values}>
      {children}
    </HydraulicContext.Provider>
  );
};

export const useHydraulicContext = () => {
  const context = useContext(HydraulicContext);
  if (context === undefined) {
    throw new Error(EN.errors.useHydraulicContext);
  }
  return context;
};
