import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SimulationControls } from "./SimulationControls";
import EN from "constants/EN.json";
import HydraulicWorker from "workers/hydraulicsWorker.js?worker";
import { vi, describe, expect, it, beforeEach } from "vitest";
import { Pumps, Valves } from "types";

type MockedHydraulicWorker = {
  mock: {
    results: {
      value: {
        postMessage: ReturnType<typeof vi.fn>;
        terminate: ReturnType<typeof vi.fn>;
      };
    }[];
  };
};

vi.mock("workers/hydraulicsWorker.js?worker", () => ({
  default: vi.fn().mockImplementation(() => ({
    postMessage: vi.fn(),
    terminate: vi.fn(),
  })),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("SimulationControls", () => {
  it("renders all sections", () => {
    render(<SimulationControls />);

    expect(screen.queryByText(EN.overhead_panel.title)).not.toBeNull();
    expect(screen.queryByText(EN.simulation_controls.title)).not.toBeNull();
    expect(screen.queryByText(EN.real_time_data.title)).not.toBeNull();
    expect(screen.queryByText(EN.failures.title)).not.toBeNull();
  });

  it("toggles accordion panels", () => {
    render(<SimulationControls />);

    const overheadPanelSummary = screen.getByText(EN.overhead_panel.title);
    fireEvent.click(overheadPanelSummary);

    expect(overheadPanelSummary.closest(".Mui-expanded")).toBeTruthy();
  });

  it("updates pump state when a pump button is clicked", async () => {
    render(<SimulationControls />);

    const workerInstance = (HydraulicWorker as unknown as MockedHydraulicWorker)
      .mock.results[0].value;

    const overheadPanelSummary = screen.getByText(EN.overhead_panel.title);
    fireEvent.click(overheadPanelSummary);

    const pumpButton = screen.getByText(
      EN.overhead_panel.instruments.hydraulic_pumps["eng1-pump"],
    );
    fireEvent.click(pumpButton);

    await waitFor(() => {
      expect(workerInstance.postMessage).toHaveBeenCalledWith({
        type: "SET_PUMP_STATE",
        pump: Pumps.engine1,
        state: true,
      });
    });
  });

  it("updates pump state when a valve button is clicked", async () => {
    render(<SimulationControls />);

    const workerInstance = (HydraulicWorker as unknown as MockedHydraulicWorker)
      .mock.results[0].value;

    const overheadPanelSummary = screen.getByText(EN.overhead_panel.title);
    fireEvent.click(overheadPanelSummary);

    const valveButton = screen.getByText(
      EN.overhead_panel.instruments.valves["eng1-valve"],
    );
    fireEvent.click(valveButton);

    await waitFor(() => {
      expect(workerInstance.postMessage).toHaveBeenCalledWith({
        type: "SET_VALVE_STATE",
        valve: Valves.engine1,
        state: false,
      });
    });
  });
});
