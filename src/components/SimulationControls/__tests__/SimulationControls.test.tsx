import { screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import {
  mockDefaultHydraulicContext,
  mockedUseMediaQuery,
  mockHydraulicContext,
  renderWithWrappers,
} from "utils/testUtils";
import { SimulationControls } from "..";
import "@testing-library/jest-dom";

import EN from "constants/EN.json";

describe("SimulationControls", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockHydraulicContext();
  });
  describe("GIVEN the component is rendered", () => {
    test("THEN it is rendered correctly", () => {
      const { asFragment } = renderWithWrappers(<SimulationControls />);
      expect(asFragment()).toMatchSnapshot();
    });

    test("AND all subsections are rendered correctly", () => {
      renderWithWrappers(<SimulationControls />);

      expect(screen.getByText(EN.overhead_panel.title)).toBeInTheDocument();
      expect(
        screen.getByText(EN.simulation_controls.title),
      ).toBeInTheDocument();
      expect(screen.getByText(EN.real_time_data.title)).toBeInTheDocument();
      expect(screen.getByText(EN.failures.title)).toBeInTheDocument();
    });
  });

  describe("GIVEN I am on a large device", () => {
    describe("WHEN I click on a accordion button once", () => {
      test("THEN the menu opens", () => {
        renderWithWrappers(<SimulationControls />);

        const overheadPanelButton = screen.getByRole("button", {
          name: EN.overhead_panel.title,
        });

        fireEvent.click(overheadPanelButton);
        expect(overheadPanelButton).toHaveAttribute("aria-expanded", "true");
      });
    });

    describe("WHEN I click on a accordion button twice", () => {
      test("THEN the menu closes", () => {
        renderWithWrappers(<SimulationControls />);

        const overheadPanelButton = screen.getByRole("button", {
          name: EN.overhead_panel.title,
        });

        fireEvent.click(overheadPanelButton);
        fireEvent.click(overheadPanelButton);
        expect(overheadPanelButton).toHaveAttribute("aria-expanded", "false");
      });
    });
  });

  describe("GIVEN I am on a small device", () => {
    test("THEN I can navigate through tabs", () => {
      mockedUseMediaQuery.mockReturnValue("(max-width: 900px)");
      renderWithWrappers(<SimulationControls />);

      const overheadPanelButton = screen.getByRole("tab", {
        name: EN.overhead_panel.title,
      });

      fireEvent.click(overheadPanelButton);
      expect(overheadPanelButton).toHaveAttribute("aria-selected", "true");
      mockedUseMediaQuery.mockReset();
    });
  });

  describe('GIVEN I open the "Failure Manager" section', () => {
    describe("WHEN I trigger an engine pump failure", () => {
      test("THEN the the failure is dispatched", () => {
        mockHydraulicContext(mockDefaultHydraulicContext);

        const handlePumpButtonMock = vi.spyOn(
          mockDefaultHydraulicContext.failures,
          "handlePumpFailure",
        );

        renderWithWrappers(<SimulationControls />);

        const overheadPanelButton = screen.getByRole("button", {
          name: EN.failures.title,
        });

        fireEvent.click(overheadPanelButton);

        const engine1Button = screen.getByTestId(
          "button-onTriggerPumpFailure-engine1",
        );

        fireEvent.click(engine1Button);
        expect(handlePumpButtonMock).toHaveBeenCalledWith("engine1");
      });
    });
    describe("WHEN I trigger an engine valve failure", () => {
      test("THEN the the failure is dispatched", () => {
        mockHydraulicContext(mockDefaultHydraulicContext);

        const handlePumpButtonMock = vi.spyOn(
          mockDefaultHydraulicContext.failures,
          "handleValveFailure",
        );

        renderWithWrappers(<SimulationControls />);

        const overheadPanelButton = screen.getByRole("button", {
          name: EN.failures.title,
        });

        fireEvent.click(overheadPanelButton);

        const engine1Button = screen.getByTestId(
          "button-onTriggerValveFailure-engine1",
        );

        fireEvent.click(engine1Button);
        expect(handlePumpButtonMock).toHaveBeenCalledWith("engine1");
      });
    });
    describe("WHEN I trigger an hydraulic line failure", () => {
      test("THEN the the failure is dispatched", () => {
        mockHydraulicContext(mockDefaultHydraulicContext);

        const handlePumpButtonMock = vi.spyOn(
          mockDefaultHydraulicContext.failures,
          "handleLineLeak",
        );

        renderWithWrappers(<SimulationControls />);

        const overheadPanelButton = screen.getByRole("button", {
          name: EN.failures.title,
        });

        fireEvent.click(overheadPanelButton);

        const engine1Button = screen.getByTestId(
          "button-onTriggerLineLeak-green",
        );

        fireEvent.click(engine1Button);
        expect(handlePumpButtonMock).toHaveBeenCalledWith("green");
      });
    });
  });
  describe('GIVEN I open the "Simulation Settings" section', () => {
    describe("WHEN I trigger a setting change", () => {
      test("THEN the the change is dispatched", () => {
        mockHydraulicContext(mockDefaultHydraulicContext);

        const handleSettingsButton = vi.spyOn(
          mockDefaultHydraulicContext.simControls,
          "updateSettings",
        );

        renderWithWrappers(<SimulationControls />);

        const overheadPanelButton = screen.getByRole("button", {
          name: EN.simulation_controls.title,
        });

        fireEvent.click(overheadPanelButton);

        const submitButton = screen.getByRole("button", {
          name: "Apply",
        });

        fireEvent.click(submitButton);
        expect(handleSettingsButton).toHaveBeenCalled();
      });
    });
    describe("WHEN I trigger a simulation reset", () => {
      test("THEN the the reset is dispatched", () => {
        mockHydraulicContext(mockDefaultHydraulicContext);

        const handleResetButton = vi.spyOn(
          mockDefaultHydraulicContext.simControls,
          "resetSimulation",
        );

        renderWithWrappers(<SimulationControls />);

        const overheadPanelButton = screen.getByRole("button", {
          name: EN.simulation_controls.title,
        });

        fireEvent.click(overheadPanelButton);

        const submitButton = screen.getByRole("button", {
          name: "Reset",
        });

        fireEvent.click(submitButton);
        expect(handleResetButton).toHaveBeenCalled();
      });
    });
  });
});
