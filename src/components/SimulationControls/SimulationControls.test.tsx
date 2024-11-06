import { renderWithHydraulicProvider } from "utils"; // Import the utility function
import { screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { SimulationControls } from "../SimulationControls";
import "@testing-library/jest-dom";

class WorkerMock {
  onmessage: ((this: Worker, ev: MessageEvent<string>) => void) | null = null;

  postMessage(message: string) {
    if (this.onmessage) {
      // @ts-expect-error - Mocking postMessage
      this.onmessage({ data: message } as MessageEvent<string>);
    }
  }

  terminate() {}
}

// @ts-expect-error - Mocking Worker
(global as Global).Worker = WorkerMock;

describe("SimulationControls", () => {
  test("renders all sections", () => {
    renderWithHydraulicProvider(<SimulationControls />);

    expect(screen.getByText(/Overhead Panel/i)).toBeInTheDocument();
    expect(screen.getByText(/Simulation Controls/i)).toBeInTheDocument();
    expect(screen.getByText(/Real Time Data/i)).toBeInTheDocument();
    expect(screen.getByText(/Failures/i)).toBeInTheDocument();
  });

  test("toggles accordion panels", () => {
    renderWithHydraulicProvider(<SimulationControls />);

    const overheadPanelButton = screen.getByRole("button", {
      name: /Overhead Panel/i,
    });
    fireEvent.click(overheadPanelButton);

    expect(overheadPanelButton).toHaveAttribute("aria-expanded", "true");
  });

  test("updates pump state when a pump button is clicked", () => {
    renderWithHydraulicProvider(<SimulationControls />);

    const overheadPanelButton = screen.getByRole("button", {
      name: /Overhead Panel/i,
    });
    fireEvent.click(overheadPanelButton);

    // TODO: Finish this test
  });

  test("updates valve state when a valve button is clicked", () => {
    renderWithHydraulicProvider(<SimulationControls />);

    const overheadPanelButton = screen.getByRole("button", {
      name: /Overhead Panel/i,
    });
    fireEvent.click(overheadPanelButton);
    // TODO: Finish this test
  });
});
