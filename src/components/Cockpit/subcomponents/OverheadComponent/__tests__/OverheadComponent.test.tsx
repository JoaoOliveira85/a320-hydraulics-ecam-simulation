import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  mockDefaultHydraulicContext,
  mockedUseMediaQuery,
  mockHydraulicContext,
  renderWithWrappers,
} from "utils/testUtils";
import { OverheadComponent } from "../OverheadComponent";
import { vi, describe, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import EN from "constants/EN.json";

describe("CockpitComponent Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockHydraulicContext();
  });

  describe("GIVEN the component is rendered", () => {
    test("THEN it gets rendered as expected", () => {
      const { asFragment } = renderWithWrappers(<OverheadComponent />);

      expect(asFragment()).toMatchSnapshot();
    });
    describe("WHEN the theme is light", () => {
      test("THEN the component is rendered with light assets", () => {
        mockedUseMediaQuery.mockReturnValue(false);

        renderWithWrappers(<OverheadComponent />);

        const image = screen.getByAltText(EN.overhead_component.overheadPanel);
        expect(image).toBeInTheDocument();
        expect((image as HTMLImageElement).src).toContain(
          "overhead_panel_day_hyd_offc.webp",
        );
      });
    });

    describe("WHEN the theme is dark", () => {
      test("THEN the component is rendered with dark assets", () => {
        mockedUseMediaQuery.mockReturnValue(true);

        renderWithWrappers(<OverheadComponent />, { theme: "darkTheme" });

        const image = screen.getByAltText(EN.overhead_component.overheadPanel);
        expect(image).toBeInTheDocument();
        expect((image as HTMLImageElement).src).toContain(
          "overhead_panel_night_hyd_offc.webp",
        );
      });
    });
  });
  describe("GIVEN I want to interact with the buttons", () => {
    describe("GIVEN I press the ENG1 button", () => {
      test("THEN the right handler is called and the button state changes", async () => {
        mockDefaultHydraulicContext.pumps.engine1 = false;
        const handlePumpButtonMock = vi.spyOn(
          mockDefaultHydraulicContext.controls,
          "handlePumpButton",
        );

        mockHydraulicContext(mockDefaultHydraulicContext);

        const { rerender } = renderWithWrappers(<OverheadComponent />);

        const engine1Button = screen.getByTestId("button-engine1");
        await userEvent.click(engine1Button);

        expect(handlePumpButtonMock).toHaveBeenCalledWith("engine1");

        rerender(<OverheadComponent />);

        const engine1Image = screen.getByAltText(EN.overhead_component.engine1);
        expect(engine1Image).toHaveStyle("opacity: 1");
      });
    });
    describe("GIVEN I press the ENG1 button", () => {
      test("THEN the right handler is called and the button state changes", async () => {
        mockDefaultHydraulicContext.pumps.engine2 = false;
        const handlePumpButtonMock = vi.spyOn(
          mockDefaultHydraulicContext.controls,
          "handlePumpButton",
        );

        mockHydraulicContext(mockDefaultHydraulicContext);

        const { rerender } = renderWithWrappers(<OverheadComponent />);

        const engine2Button = screen.getByTestId("button-engine2");
        await userEvent.click(engine2Button);

        expect(handlePumpButtonMock).toHaveBeenCalledWith("engine2");

        rerender(<OverheadComponent />);
        const engine2Image = screen.getByAltText(EN.overhead_component.engine2);
        expect(engine2Image).toHaveStyle("opacity: 1");
      });
    });
    describe("GIVEN I press the RAM button", () => {
      test("THEN the right handler is called and the button state changes", async () => {
        mockDefaultHydraulicContext.pumps.ramAirTurbine = true;
        const handlePumpButtonMock = vi.spyOn(
          mockDefaultHydraulicContext.controls,
          "handlePumpButton",
        );

        mockHydraulicContext(mockDefaultHydraulicContext);

        const { rerender } = renderWithWrappers(<OverheadComponent />);

        const ramAirTurbine = screen.getByTestId("button-ramTurbine");
        await userEvent.click(ramAirTurbine);

        expect(handlePumpButtonMock).toHaveBeenCalledWith("ramAirTurbine");

        rerender(<OverheadComponent />);
        const ratImage = screen.getByAltText(EN.overhead_component.rat);
        expect(ratImage).toHaveStyle("opacity: 1");
      });
    });
    describe("GIVEN I press the PTU button", () => {
      test("THEN the right handler is called and the button state changes", async () => {
        mockDefaultHydraulicContext.ptus.powerTransferUnit = false;
        const handlePumpButtonMock = vi.spyOn(
          mockDefaultHydraulicContext.controls,
          "handlePtuButton",
        );

        mockHydraulicContext(mockDefaultHydraulicContext);

        renderWithWrappers(<OverheadComponent />);

        const ptuButton = screen.getByTestId("button-ptu");
        await userEvent.click(ptuButton);

        expect(handlePumpButtonMock).toHaveBeenCalledWith("powerTransferUnit");

        const ptuImage = screen.getByAltText(EN.overhead_component.ptu);
        expect(ptuImage).toHaveStyle("opacity: 1");
      });
    });
    describe("GIVEN I press the BLUE ELEC button", () => {
      test("THEN the right handler is called and the button state changes", async () => {
        mockDefaultHydraulicContext.pumps.blueElectricPump = false;
        const handlePumpButtonMock = vi.spyOn(
          mockDefaultHydraulicContext.controls,
          "handlePumpButton",
        );

        mockHydraulicContext(mockDefaultHydraulicContext);

        renderWithWrappers(<OverheadComponent />);

        const blueElecButton = screen.getByTestId("button-electricBlue");
        await userEvent.click(blueElecButton);

        expect(handlePumpButtonMock).toHaveBeenCalledWith("blueElectricPump");

        const blueElecImage = screen.getByAltText(
          EN.overhead_component.blueElec,
        );
        expect(blueElecImage).toHaveStyle("opacity: 1");
      });
    });
    describe("GIVEN I press the YELLOW ELEC button", () => {
      test("THEN the right handler is called and the button state changes", async () => {
        mockDefaultHydraulicContext.pumps.yellowElectricPump = true;
        const handlePumpButtonMock = vi.spyOn(
          mockDefaultHydraulicContext.controls,
          "handlePumpButton",
        );

        mockHydraulicContext(mockDefaultHydraulicContext);

        renderWithWrappers(<OverheadComponent />);

        const yellowElecButton = screen.getByTestId("button-electricYellow");
        await userEvent.click(yellowElecButton);

        expect(handlePumpButtonMock).toHaveBeenCalledWith("yellowElectricPump");

        const yellowElecImage = screen.getByAltText(
          EN.overhead_component.yellowElec,
        );
        expect(yellowElecImage).toHaveStyle("opacity: 1");
      });
    });
  });
});
