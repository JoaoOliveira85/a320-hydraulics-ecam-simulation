import { render, act, cleanup } from "@testing-library/react";
import { vi } from "vitest";
import { useContext } from "react";
import { HydraulicContextProvider } from "../HydraulicContextProvider";
import { HydraulicContext } from "../HydraulicContext";
import { WorkerActions } from "types/hydraulicWorkerTypes";
import defaultSettings from "workers/simulationDefaultSettings.json";
import { Colors, HydraulicContextType } from "types";

const mockWorkers: Worker[] = [];

vi.mock("workers/hydraulicsWorker.js?worker", () => {
  return {
    default: vi.fn().mockImplementation(() => {
      const worker = {
        postMessage: vi.fn(),
        terminate: vi.fn(),
        onmessage: null,
        onmessageerror: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
        onerror: null,
      };
      mockWorkers.push(worker);
      return worker;
    }),
  };
});

describe("HydraulicContextProvider", () => {
  afterEach(() => {
    cleanup();
    mockWorkers.length = 0;
  });

  it("initializes the worker and sets up onmessage handler", () => {
    render(
      <HydraulicContextProvider>
        <div>Test Child</div>
      </HydraulicContextProvider>,
    );

    expect(mockWorkers.length).toBe(1);
    const worker = mockWorkers[0];
    expect(worker).toBeDefined();
    expect(worker.onmessage).toBeDefined();
  });

  it("terminates the worker on unmount", () => {
    const { unmount } = render(
      <HydraulicContextProvider>
        <div>Test Child</div>
      </HydraulicContextProvider>,
    );

    const worker = mockWorkers[0];
    expect(worker.terminate).not.toHaveBeenCalled();

    unmount();

    expect(worker.terminate).toHaveBeenCalled();
  });

  it("updates state when worker sends a message", () => {
    const TestComponent = () => {
      const context = useContext(HydraulicContext);
      return (
        <div>
          <div data-testid="pressure-green">{context!.pressures.green}</div>
          <div data-testid="reservoire-green">{context!.reservoires.green}</div>
          <div data-testid="other-airTemperature">
            {context!.other.airTemperature}
          </div>
        </div>
      );
    };

    const { getByTestId } = render(
      <HydraulicContextProvider>
        <TestComponent />
      </HydraulicContextProvider>,
    );

    const worker = mockWorkers[0];
    const firstEvent = {
      data: {
        pressures: { green: 0, blue: 0, yellow: 0 },
        reservoires: { green: 80, blue: 70, yellow: 60 },
        settings: {
          other: {
            airTemperature: 30,
            grossWeight: 100000,
            hydraulicLineMaxPressure: 5000,
            ptuThreshold: 2000,
            status: true,
            speed: 300,
          },
        },
      },
    };

    act(() => {
      if (worker.onmessage) {
        worker.onmessage(
          new MessageEvent("message", { data: firstEvent.data }),
        );
      }
    });

    expect(getByTestId("pressure-green").textContent).toBe("0");
    expect(getByTestId("reservoire-green").textContent).toBe((1.6).toString());
    expect(getByTestId("other-airTemperature").textContent).toBe(
      (30).toString(),
    );

    const secondEvent = {
      data: {
        pressures: { green: 3000, blue: 2500, yellow: 2000 },
        reservoires: { green: 80, blue: 70, yellow: 60 },
        settings: {
          other: {
            airTemperature: 30,
            grossWeight: 100000,
            hydraulicLineMaxPressure: 5000,
            ptuThreshold: 2000,
            status: true,
            speed: 300,
          },
        },
      },
    };

    act(() => {
      if (worker.onmessage) {
        worker.onmessage(
          new MessageEvent("message", { data: secondEvent.data }),
        );
      }
    });

    expect(getByTestId("pressure-green").textContent).toBe("3000");
    expect(getByTestId("reservoire-green").textContent).toBe(
      ((80 / defaultSettings.reservoireMaxLevels.green) * 100).toString(),
    );
    expect(getByTestId("other-airTemperature").textContent).toBe("30");
  });

  it("handlePumpButton toggles pump state and calls setPumpState", () => {
    let testContext: HydraulicContextType | undefined;
    const TestComponent = () => {
      testContext = useContext(HydraulicContext);
      return null;
    };

    render(
      <HydraulicContextProvider>
        <TestComponent />
      </HydraulicContextProvider>,
    );

    const worker = mockWorkers[0] as jest.Mocked<Worker>;
    worker.postMessage.mockClear();

    const initialPumpState = defaultSettings.engineStartStatus.engine1;

    act(() => {
      testContext!.controls.handlePumpButton("engine1");
    });

    expect(testContext!.pumps.engine1).toBe(!initialPumpState);
    expect(worker.postMessage).toHaveBeenCalledWith({
      type: WorkerActions.SET_PUMP_STATE,
      pump: "engine1",
      state: !initialPumpState,
    });
  });

  it("handleValveButton toggles valve state and calls setValveState", () => {
    let testContext: HydraulicContextType | undefined;
    const TestComponent = () => {
      testContext = useContext(HydraulicContext);
      return null;
    };

    render(
      <HydraulicContextProvider>
        <TestComponent />
      </HydraulicContextProvider>,
    );

    const worker = mockWorkers[0] as jest.Mocked<Worker>;
    worker.postMessage.mockClear();

    const initialValveState = defaultSettings.valveStartStatus.green;

    act(() => {
      testContext!.controls.handleValveButton("engine1");
    });

    expect(testContext!.valves.engine1).toBe(!initialValveState);
    expect(worker.postMessage).toHaveBeenCalledWith({
      type: WorkerActions.SET_VALVE_STATE,
      valve: "engine1",
      state: !initialValveState,
    });
  });

  it("handlePtuButton toggles PTU state and calls setPtuState", () => {
    let testContext: HydraulicContextType | undefined;
    const TestComponent = () => {
      testContext = useContext(HydraulicContext);
      return null;
    };

    render(
      <HydraulicContextProvider>
        <TestComponent />
      </HydraulicContextProvider>,
    );

    const worker = mockWorkers[0] as jest.Mocked<Worker>;
    worker.postMessage.mockClear();

    const initialPtuState = defaultSettings.ptuStartStatus;

    act(() => {
      testContext!.controls.handlePtuButton("powerTransferUnit");
    });

    expect(testContext!.ptus.powerTransferUnit).toBe(!initialPtuState);
    expect(worker.postMessage).toHaveBeenCalledWith({
      type: WorkerActions.SET_PTU_STATE,
      ptu: "powerTransferUnit",
      state: !initialPtuState,
    });
  });

  it("handlePumpFailure calls triggerFailure with correct arguments", () => {
    let testContext: HydraulicContextType | undefined;
    const TestComponent = () => {
      testContext = useContext(HydraulicContext);
      return null;
    };

    render(
      <HydraulicContextProvider>
        <TestComponent />
      </HydraulicContextProvider>,
    );

    const worker = mockWorkers[0] as jest.Mocked<Worker>;
    worker.postMessage.mockClear();

    act(() => {
      testContext!.failures.handlePumpFailure("engine1");
    });

    expect(worker.postMessage).toHaveBeenCalledWith({
      type: WorkerActions.TRIGGER_FAILURE,
      pump: "engine1",
    });
  });

  it("handleValveFailure calls triggerFailure with correct arguments", () => {
    let testContext: HydraulicContextType | undefined;
    const TestComponent = () => {
      testContext = useContext(HydraulicContext);
      return null;
    };

    render(
      <HydraulicContextProvider>
        <TestComponent />
      </HydraulicContextProvider>,
    );

    const worker = mockWorkers[0] as jest.Mocked<Worker>;
    worker.postMessage.mockClear();

    act(() => {
      testContext!.failures.handleValveFailure("engine1");
    });

    expect(worker.postMessage).toHaveBeenCalledWith({
      type: WorkerActions.TRIGGER_FAILURE,
      valve: "engine1",
    });
  });

  it("handleLineLeak calls triggerFailure with correct arguments", () => {
    let testContext: HydraulicContextType | undefined;
    const TestComponent = () => {
      testContext = useContext(HydraulicContext);
      return null;
    };

    render(
      <HydraulicContextProvider>
        <TestComponent />
      </HydraulicContextProvider>,
    );

    const worker = mockWorkers[0] as jest.Mocked<Worker>;
    worker.postMessage.mockClear();

    act(() => {
      testContext!.failures.handleLineLeak("green" as Colors);
    });

    expect(worker.postMessage).toHaveBeenCalledWith({
      type: WorkerActions.TRIGGER_FAILURE,
      line: "green",
    });
  });

  it("updateSettings calls workerRef.current.postMessage with correct arguments", () => {
    let testContext: HydraulicContextType | undefined;
    const TestComponent = () => {
      testContext = useContext(HydraulicContext);
      return null;
    };

    render(
      <HydraulicContextProvider>
        <TestComponent />
      </HydraulicContextProvider>,
    );

    const worker = mockWorkers[0] as jest.Mocked<Worker>;
    worker.postMessage.mockClear();

    const newSettings = {
      reservoireStartingLevels: { green: 90, blue: 90, yellow: 90 },
      reservoireLeakageRates: { green: 0.1, blue: 0.1, yellow: 0.1 },
      pumpMaxFlowRates: {
        engine1: 1000,
        engine2: 1000,
        blueElectricPump: 500,
        yellowElectricPump: 500,
        ramAirTurbine: 750,
      },
      other: {
        hydraulicLineMaxPressure: 5000,
        ptuThreshold: 2000,
        airTemperature: 25,
        status: true,
        speed: 250,
        grossWeight: 70000,
      },
    };

    act(() => {
      testContext!.simControls.updateSettings(newSettings);
    });

    expect(worker.postMessage).toHaveBeenCalledWith({
      type: WorkerActions.UPDATE_SETTINGS,
      settings: newSettings,
    });
  });

  it("resetSimulation calls workerRef.current.postMessage with correct arguments", () => {
    let testContext: HydraulicContextType | undefined;
    const TestComponent = () => {
      testContext = useContext(HydraulicContext);
      return null;
    };

    render(
      <HydraulicContextProvider>
        <TestComponent />
      </HydraulicContextProvider>,
    );

    const worker = mockWorkers[0] as jest.Mocked<Worker>;
    worker.postMessage.mockClear();

    act(() => {
      testContext!.simControls.resetSimulation();
    });

    expect(worker.postMessage).toHaveBeenCalledWith({
      type: WorkerActions.RESET_SIMULATION,
    });
  });
});
