import { screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { renderWithWrappers } from "utils/testUtils";
import { EcamDisplay } from "../EcamDisplay";
import React from "react";

import "vitest-canvas-mock";
import { drawLine, drawShape, drawText } from "utils";

describe("EcamDisplay Component", () => {
  const pressures = {
    green: 0,
    blue: 0,
    yellow: 0,
  };

  const pumps = {
    engine1: false,
    engine2: false,
    blueElectricPump: false,
    powerTransferUnit: false,
    ramAirTurbine: false,
    yellowElectricPump: false,
  };

  const valves = {
    engine1: false,
    engine2: false,
  };

  const reservoires = {
    green: 0,
    blue: 0,
    yellow: 0,
  };

  const other = {
    airTemperature: 0,
    grossWeight: 0,
  };

  const ptus = {
    powerTransferUnit: false,
  };

  describe("GIVEN the component is rendered", () => {
    beforeEach(() => {
      vi.mock("utils", () => ({
        drawLine: vi.fn(),
        drawPump: vi.fn(),
        drawValve: vi.fn(),
        drawReservoir: vi.fn(),
        drawShape: vi.fn().mockReturnValue({
          square: vi.fn(),
          circle: vi.fn(),
          triangle: vi.fn(),
        }),
        drawText: vi.fn(),
        ecamHeader: vi.fn(),
        permanentData: vi.fn(),
      }));
    });

    test("THEN it gets rendered as expected", () => {
      const { asFragment } = renderWithWrappers(
        <EcamDisplay
          pressures={pressures}
          pumps={pumps}
          ptus={ptus}
          valves={valves}
          reservoires={reservoires}
          other={other}
        />,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    test("AND has proper dimensions", () => {
      renderWithWrappers(
        <EcamDisplay
          pressures={pressures}
          pumps={pumps}
          ptus={ptus}
          valves={valves}
          reservoires={reservoires}
          other={other}
        />,
      );
      const canvasElement = screen.getByTestId("canvas");

      expect((canvasElement as HTMLCanvasElement).width).toBeGreaterThan(0);
      expect((canvasElement as HTMLCanvasElement).height).toBeGreaterThan(0);
    });
  });

  describe("WHEN hydraulic system of engine 1 fails", () => {
    test("THEN the PTU is activated", () => {
      renderWithWrappers(
        <EcamDisplay
          pressures={pressures}
          pumps={{
            ...pumps,
            engine1: false,
            engine2: true,
          }}
          ptus={{ powerTransferUnit: true }}
          valves={{
            engine1: false,
            engine2: true,
          }}
          reservoires={reservoires}
          other={other}
        />,
      );

      expect(drawLine).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "green",
        }),
      );
    });
  });

  describe("WHEN hydraulic system of engine 2 fails", () => {
    test("THEN the PTU is activated", () => {
      renderWithWrappers(
        <EcamDisplay
          pressures={pressures}
          pumps={{
            ...pumps,
            engine1: true,
            engine2: false,
          }}
          ptus={{ powerTransferUnit: true }}
          valves={{
            engine1: true,
            engine2: false,
          }}
          reservoires={reservoires}
          other={other}
        />,
      );
      expect(drawLine).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "green",
        }),
      );
    });
  });

  describe("WHEN both systems fail and yellow backup starts", () => {
    test("THEN the PTU is activated", () => {
      renderWithWrappers(
        <EcamDisplay
          pressures={pressures}
          pumps={{
            ...pumps,
            engine1: false,
            engine2: false,
            yellowElectricPump: true,
          }}
          ptus={{ powerTransferUnit: true }}
          valves={{
            engine1: false,
            engine2: false,
          }}
          reservoires={reservoires}
          other={other}
        />,
      );
      expect(drawLine).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "green",
        }),
      );
    });
  });

  describe("WHEN PTU is not active", () => {
    test("THEN the PTU text is white", () => {
      renderWithWrappers(
        <EcamDisplay
          pressures={pressures}
          pumps={{
            ...pumps,
            engine1: true,
            engine2: true,
          }}
          ptus={{ powerTransferUnit: true }}
          valves={{
            engine1: true,
            engine2: false,
          }}
          reservoires={reservoires}
          other={other}
        />,
      );
      expect(drawText).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "white",
        }),
      );
    });
  });

  describe("WHEN RAM air turbine is activated", () => {
    test("THEN its status is reflected on the ECAM", () => {
      renderWithWrappers(
        <EcamDisplay
          pressures={pressures}
          pumps={{
            ...pumps,
            ramAirTurbine: true,
          }}
          ptus={ptus}
          valves={valves}
          reservoires={reservoires}
          other={other}
        />,
      );
      expect(drawShape).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "green",
        }),
      );
    });
  });

  describe("WHEN the canvas is not rendered correctly,", () => {
    test("THEN should return early if canvas element is not available", () => {
      vi.spyOn(React, "useRef").mockReturnValue({ current: null });

      renderWithWrappers(
        <EcamDisplay
          pressures={{ green: 100, blue: 100, yellow: 100 }}
          reservoires={{ green: 50, blue: 50, yellow: 50 }}
          pumps={{
            engine1: true,
            engine2: true,
            blueElectricPump: true,
            ramAirTurbine: false,
            yellowElectricPump: false,
          }}
          valves={{ engine1: true, engine2: false }}
          ptus={{ powerTransferUnit: true }}
          other={{ airTemperature: 25, grossWeight: 1000 }}
          renderCanvas={false}
        />,
      );

      vi.restoreAllMocks();
    });

    test("AND properly handles canvas error when context is null", async () => {
      vi.spyOn(React, "useRef").mockReturnValueOnce({
        current: document.createElement("canvas"),
      });
      HTMLCanvasElement.prototype.getContext = vi
        .fn()
        .mockReturnValueOnce(null);

      renderWithWrappers(
        <EcamDisplay
          pressures={pressures}
          pumps={pumps}
          ptus={ptus}
          valves={valves}
          reservoires={reservoires}
          other={other}
        />,
      );

      await waitFor(() => {
        expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalled();
      });
    });
  });
});
