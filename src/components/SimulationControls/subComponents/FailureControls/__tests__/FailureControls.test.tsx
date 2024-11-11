import { screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { renderWithWrappers } from "utils/testUtils";
import { FailureControls } from "../FailureControls";
import "@testing-library/jest-dom";

const mockTriggerLineLeak = vi.fn();
const mockTriggerPumpFailure = vi.fn();
const mockTriggerValveFailure = vi.fn();

describe("FailureControls", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  describe("GIVEN the component is rendered", () => {
    test("THEN it is rendered correctly", () => {
      const { asFragment } = renderWithWrappers(
        <FailureControls
          onTriggerLineLeak={mockTriggerLineLeak}
          onTriggerPumpFailure={mockTriggerPumpFailure}
          onTriggerValveFailure={mockTriggerValveFailure}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
  beforeEach(() => {
    renderWithWrappers(
      <FailureControls
        onTriggerLineLeak={mockTriggerLineLeak}
        onTriggerPumpFailure={mockTriggerPumpFailure}
        onTriggerValveFailure={mockTriggerValveFailure}
      />,
    );
  });
  describe('GIVEN I open the "Failure Controls" section', () => {
    describe("WHEN I press a pump failure button", () => {
      test("THEN the the action is dispatched", () => {
        const enginePumpButton = screen.getByTestId(
          "button-onTriggerPumpFailure-engine1",
        );

        fireEvent.click(enginePumpButton);

        expect(mockTriggerPumpFailure).toHaveBeenCalled();
      });
    });
    describe("WHEN I press a valve failure button", () => {
      test("THEN the the action is dispatched", () => {
        const engineValveButton = screen.getByTestId(
          "button-onTriggerValveFailure-engine1",
        );

        fireEvent.click(engineValveButton);

        expect(mockTriggerValveFailure).toHaveBeenCalled();
      });
    });
    describe("WHEN I press a line leak button", () => {
      test("THEN the the action is dispatched", () => {
        const lineLeakButton = screen.getByTestId(
          "button-onTriggerLineLeak-green",
        );

        fireEvent.click(lineLeakButton);

        expect(mockTriggerLineLeak).toHaveBeenCalled();
      });
    });
  });
});
