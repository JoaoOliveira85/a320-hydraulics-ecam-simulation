import { screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { mockHydraulicContext, renderWithWrappers } from "utils/testUtils";
import { SimulationSettingsComponent } from "../SimulationSettingsComponent";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const mockApplySettings = vi.fn();
const mockResetSettings = vi.fn();

describe("SimulationSettingsComponent", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockHydraulicContext();
  });

  describe("GIVEN the component is rendered", () => {
    test("THEN it is rendered correctly", () => {
      const { asFragment } = renderWithWrappers(
        <SimulationSettingsComponent
          onApplySettings={mockApplySettings}
          onResetSettings={mockResetSettings}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });

    test("THEN handleChange updates the state correctly", async () => {
      renderWithWrappers(
        <SimulationSettingsComponent
          onApplySettings={mockApplySettings}
          onResetSettings={mockResetSettings}
        />,
      );

      const input = screen.getByTestId("reservoireStartingLevels-green");

      expect(input).toBeInTheDocument();

      await userEvent.clear(input);
      await userEvent.type(input, "500");

      expect((input as HTMLInputElement).value).toBe("500");
    });
  });
});
