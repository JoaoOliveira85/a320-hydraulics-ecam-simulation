import { screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { renderWithWrappers } from "utils/testUtils";
import { OverheadPanel } from "../OverheadPanel";
import "@testing-library/jest-dom";

import EN from "constants/EN.json";

const mockHandlePumpButton = vi.fn();
const mockHandlePtuButton = vi.fn();
const mockHandleValveButton = vi.fn();

describe("OverheadPanel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  describe("GIVEN the component is rendered", () => {
    test("THEN it is rendered correctly", () => {
      const { asFragment } = renderWithWrappers(
        <OverheadPanel
          handlePumpButton={mockHandlePumpButton}
          handlePtuButton={mockHandlePtuButton}
          handleValveButton={mockHandleValveButton}
        />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
  beforeEach(() => {
    renderWithWrappers(
      <OverheadPanel
        handlePumpButton={mockHandlePumpButton}
        handlePtuButton={mockHandlePtuButton}
        handleValveButton={mockHandleValveButton}
      />,
    );
  });
  describe('GIVEN I open the "Overhead Panel" section', () => {
    describe("WHEN I press a pump button", () => {
      test("THEN the the action is dispatched", () => {
        const enginePumpButton = screen.getByRole("button", {
          name: EN.overhead_panel.instruments.hydraulic_pumps["eng1-pump"],
        });

        fireEvent.click(enginePumpButton);

        expect(mockHandlePumpButton).toHaveBeenCalled();
      });
    });
    describe("WHEN I press a Valve button", () => {
      test("THEN the the action is dispatched", () => {
        const valveButton = screen.getByRole("button", {
          name: EN.overhead_panel.instruments.valves["eng1-valve"],
        });

        fireEvent.click(valveButton);

        expect(mockHandleValveButton).toHaveBeenCalled();
      });
    });
    describe("WHEN I press a PTU button", () => {
      test("THEN the the action is dispatched", () => {
        const ptuButton = screen.getByRole("button", {
          name: EN.overhead_panel.instruments.hydraulic_pumps["ptu-auto"],
        });

        fireEvent.click(ptuButton);

        expect(mockHandlePtuButton).toHaveBeenCalled();
      });
    });
  });
});
