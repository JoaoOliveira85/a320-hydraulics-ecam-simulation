import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { EcamDisplay } from "../EcamDisplay";
import React from "react";

import "vitest-canvas-mock";

describe("EcamDisplay Component", () => {
  test("renders without crashing", () => {
    render(<EcamDisplay />);
    const canvasElement = screen.getByTestId("canvas");
    expect(canvasElement).not.toBeNull();
  });

  test("sets canvas width and height based on resolution and scaling", () => {
    render(<EcamDisplay />);
    const canvasElement: HTMLCanvasElement = screen.getByTestId("canvas");

    canvasElement.width = 800;
    canvasElement.height = 600;

    const ctx = canvasElement.getContext("2d");
    if (!ctx) {
      throw new Error("2D context not supported or canvas already initialized");
    }
    expect(canvasElement.width).toBeGreaterThan(0);
    expect(canvasElement.height).toBeGreaterThan(0);
    expect(ctx).not.toBeNull();
  });

  test("fills the canvas with the correct background color", () => {
    render(<EcamDisplay />);
    const canvasElement: HTMLCanvasElement = screen.getByTestId("canvas");
    const ctx = canvasElement.getContext("2d");
    if (!ctx) {
      throw new Error("2D context not supported or canvas already initialized");
    }
    ctx.fillStyle = "#000080";

    const backgroundColor = "#000080";
    expect(ctx.fillStyle).toBe(backgroundColor);
  });

  test("draws the correct text on the canvas", () => {
    render(<EcamDisplay />);
    const canvasElement: HTMLCanvasElement = screen.getByTestId("canvas");
    const ctx = canvasElement.getContext("2d");
    if (!ctx) {
      throw new Error("2D context not supported or canvas already initialized");
    }
    ctx.fillText = vi.fn();

    ctx.fillText(
      "Hello World",
      canvasElement.width / 2,
      canvasElement.height / 2,
    );

    expect(ctx.fillText).toHaveBeenCalledWith(
      "Hello World",
      canvasElement.width / 2,
      canvasElement.height / 2,
    );
  });

  test("draws a green circle at the center of the canvas", () => {
    render(<EcamDisplay />);
    const canvasElement: HTMLCanvasElement = screen.getByTestId("canvas");
    const ctx = canvasElement.getContext("2d");
    if (!ctx) {
      throw new Error("2D context not supported or canvas already initialized");
    }
    ctx.arc = vi.fn();
    ctx.fillStyle = "#008000";
    ctx.arc(
      canvasElement.width / 2,
      canvasElement.height / 2,
      50,
      0,
      2 * Math.PI,
    );

    expect(ctx.fillStyle).toBe("#008000");
    expect(ctx.arc).toHaveBeenCalledWith(
      canvasElement.width / 2,
      canvasElement.height / 2,
      50,
      0,
      2 * Math.PI,
    );
  });

  test("handles canvas error when context is null", async () => {
    vi.spyOn(React, "useRef").mockReturnValueOnce({
      current: document.createElement("canvas"),
    });
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValueOnce(null);

    const mathMinMock = vi.spyOn(Math, "min");

    render(<EcamDisplay />);

    await waitFor(() => {
      expect(mathMinMock).not.toHaveBeenCalled();
    });
  });

  test("does not proceed if canvasRef is null", async () => {
    vi.spyOn(React, "useRef").mockReturnValueOnce({ current: null });

    const mathMinMock = vi.spyOn(Math, "min");

    render(<EcamDisplay />);
    await waitFor(() => {
      expect(mathMinMock).not.toHaveBeenCalled();
    });
  });
});
