import { HydraulicContextType } from "types";
import * as hooks from "hooks";
import { vi } from "vitest";

export const mockDefaultHydraulicContext: HydraulicContextType = {
  pressures: {
    green: 120,
    blue: 115,
    yellow: 130,
  },
  reservoires: {
    green: 500,
    blue: 450,
    yellow: 600,
  },
  simControls: {
    resetSimulation: vi.fn(),
    updateSettings: vi.fn(),
  },
  controls: {
    handlePumpButton: vi.fn(),
    handleValveButton: vi.fn(),
    handlePtuButton: vi.fn(),
  },
  failures: {
    handlePumpFailure: vi.fn(),
    handleValveFailure: vi.fn(),
    handleLineLeak: vi.fn(),
  },
  pumps: {
    engine1: true,
    engine2: true,
    blueElectricPump: true,
    yellowElectricPump: false,
    ramAirTurbine: false,
  },
  valves: {
    engine1: true,
    engine2: true,
  },
  ptus: {
    powerTransferUnit: true,
  },
  other: {
    hydraulicLineMaxPressure: 200,
    ptuThreshold: 75,
    airTemperature: 25,
    status: true,
    speed: 60,
    grossWeight: 10000,
  },
};

export const mockHydraulicContext = (
  requestedContextChanges?: HydraulicContextType,
) =>
  vi.spyOn(hooks, "useHydraulicContext").mockReturnValue({
    ...mockDefaultHydraulicContext,
    ...requestedContextChanges,
  });
