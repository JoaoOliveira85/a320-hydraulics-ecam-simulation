import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { EcamDisplay } from "../EcamDisplay";
import React from "react";

import "vitest-canvas-mock";

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

  test("renders without crashing and has canvas element", () => {
    render(
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
    expect(canvasElement).not.toBeNull();
  });

  test("sets canvas width and height based on ecam display settings", () => {
    render(
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

  test("fills the canvas with the correct background color", () => {
    render(
      <EcamDisplay
        pressures={pressures}
        pumps={pumps}
        ptus={ptus}
        valves={valves}
        reservoires={reservoires}
        other={other}
      />,
    );
    const canvasElement: HTMLCanvasElement = screen.getByTestId("canvas");
    const ctx = canvasElement.getContext("2d");
    if (!ctx) {
      throw new Error("2D context not supported or canvas already initialized");
    }

    expect(ctx.fillStyle).toBe("#87ceeb");
  });

  test("handles canvas error when context is null", async () => {
    vi.spyOn(React, "useRef").mockReturnValueOnce({
      current: document.createElement("canvas"),
    });
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValueOnce(null);

    render(
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

  test("does not proceed if canvasRef is null", async () => {
    vi.spyOn(React, "useRef").mockReturnValueOnce({ current: null });

    render(
      <EcamDisplay
        pressures={pressures}
        pumps={pumps}
        ptus={ptus}
        valves={valves}
        reservoires={reservoires}
        other={other}
      />,
    );

    const canvasElement = screen.queryByTestId("canvas");
    expect(canvasElement).not.toBeNull();
  });
});
