import { describe, test, expect, vi } from "vitest";
import {
  drawLine,
  drawShape,
  drawPump,
  drawValve,
  permanentData,
  ecamHeader,
  drawReservoir,
  drawText,
} from "..";

const createMockContext = (): CanvasRenderingContext2D => {
  const mockCanvas = document.createElement("canvas");

  return {
    canvas: mockCanvas,
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    arc: vi.fn(),
    rect: vi.fn(),
    closePath: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    fillText: vi.fn(),
    fillStyle: "",
    font: "",
    strokeStyle: "",
    lineWidth: 0,
  } as unknown as CanvasRenderingContext2D;
};

describe("Canvas Utility Functions", () => {
  test("drawLine - draws a horizontal line", () => {
    const ctx = createMockContext();
    drawLine({
      ctx,
      orientation: "horizontal",
      from: { x: 10, y: 20 },
      length: 50,
      color: "white",
      width: 2,
    });

    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.moveTo).toHaveBeenCalledWith(10, 20);
    expect(ctx.lineTo).toHaveBeenCalledWith(60, 20);
    expect(ctx.strokeStyle).toBe("white");
    expect(ctx.lineWidth).toBe(2);
    expect(ctx.stroke).toHaveBeenCalled();
    expect(ctx.closePath).toHaveBeenCalled();
  });

  test("drawLine - draws a vertical line", () => {
    const ctx = createMockContext();
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: 10, y: 20 },
      length: 50,
      color: "green",
    });

    expect(ctx.moveTo).toHaveBeenCalledWith(10, 20);
    expect(ctx.lineTo).toHaveBeenCalledWith(10, 70);
    expect(ctx.strokeStyle).toBe("green");
    expect(ctx.lineWidth).toBe(3);
  });

  test("drawShape - draws a filled circle", () => {
    const ctx = createMockContext();
    drawShape({
      ctx,
      position: { x: 30, y: 30 },
      size: 20,
      color: "green",
      fill: true,
    }).circle();

    expect(ctx.arc).toHaveBeenCalledWith(30, 30, 20, 0, 2 * Math.PI);
    expect(ctx.fillStyle).toBe("green");
    expect(ctx.fill).toHaveBeenCalled();
    expect(ctx.stroke).toHaveBeenCalled();
  });

  test("drawShape - draws a triangle pointing up", () => {
    const ctx = createMockContext();
    drawShape({
      ctx,
      position: { x: 30, y: 30 },
      size: 20,
      color: "orange",
      fill: false,
    }).triangle("up");

    expect(ctx.moveTo).toHaveBeenCalledWith(30, 20);
    expect(ctx.lineTo).toHaveBeenCalledWith(20, 40);
    expect(ctx.lineTo).toHaveBeenCalledWith(20, 40);
    expect(ctx.strokeStyle).toBe("orange");
    expect(ctx.stroke).toHaveBeenCalled();
  });

  test("drawShape - draws a triangle pointing down", () => {
    const ctx = createMockContext();
    drawShape({
      ctx,
      position: { x: 30, y: 30 },
      size: 20,
      color: "orange",
      fill: true,
    }).triangle("down");

    expect(ctx.moveTo).toHaveBeenCalledWith(30, 40);
    expect(ctx.lineTo).toHaveBeenCalledWith(20, 20);
    expect(ctx.lineTo).toHaveBeenCalledWith(40, 20);
    expect(ctx.fillStyle).toBe("orange");
    expect(ctx.stroke).toHaveBeenCalled();
  });

  test("drawShape - draws a triangle pointing left", () => {
    const ctx = createMockContext();
    drawShape({
      ctx,
      position: { x: 30, y: 30 },
      size: 20,
      color: "orange",
      fill: true,
    }).triangle("left");

    expect(ctx.moveTo).toHaveBeenCalledWith(20, 30);
    expect(ctx.lineTo).toHaveBeenCalledWith(40, 40);
    expect(ctx.lineTo).toHaveBeenCalledWith(40, 40);
    expect(ctx.fillStyle).toBe("orange");
    expect(ctx.stroke).toHaveBeenCalled();
  });

  test("drawLine - draws a vertical line with default width", () => {
    const ctx = createMockContext();
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: 10, y: 20 },
      length: 50,
      color: "green",
    });

    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.moveTo).toHaveBeenCalledWith(10, 20);
    expect(ctx.lineTo).toHaveBeenCalledWith(10, 70);
    expect(ctx.strokeStyle).toBe("green");
    expect(ctx.lineWidth).toBe(3);
    expect(ctx.stroke).toHaveBeenCalled();
    expect(ctx.closePath).toHaveBeenCalled();
  });

  test("drawShape - draws a triangle pointing right", () => {
    const ctx = createMockContext();
    drawShape({
      ctx,
      position: { x: 30, y: 30 },
      size: 20,
      color: "orange",
      fill: true,
    }).triangle("right");

    expect(ctx.moveTo).toHaveBeenCalledWith(40, 30);
    expect(ctx.lineTo).toHaveBeenCalledWith(20, 20);
    expect(ctx.lineTo).toHaveBeenCalledWith(20, 20);
    expect(ctx.fillStyle).toBe("orange");
    expect(ctx.stroke).toHaveBeenCalled();
  });

  test("drawShape - draws a square", () => {
    const ctx = createMockContext();
    drawShape({
      ctx,
      position: { x: 30, y: 30 },
      size: 20,
      color: "orange",
      fill: true,
    }).square();

    expect(ctx.rect).toHaveBeenCalledWith(20, 20, 20, 20);
    expect(ctx.fillStyle).toBe("orange");
    expect(ctx.stroke).toHaveBeenCalled();
  });

  test("drawPump - draws a pump with a vertical line if status is true", () => {
    const ctx = createMockContext();
    drawPump({
      ctx,
      position: { x: 50, y: 50 },
      status: true,
      lowPressure: false,
    });

    expect(ctx.strokeStyle).toBe("green");
    expect(ctx.lineTo).toHaveBeenCalledWith(50, 65);
  });

  test("drawPump - draws a pump with a LO indication if pressure is low", () => {
    const ctx = createMockContext();
    drawPump({
      ctx,
      position: { x: 50, y: 50 },
      status: true,
      color: "black",
      size: 20,
      lowPressure: true,
    });

    expect(ctx.strokeStyle).toBe("black");
    expect(ctx.fillText).toHaveBeenCalledWith("LO", 40, 55);
  });

  test("drawValve - draws a valve with a horizontal line if status is false", () => {
    const ctx = createMockContext();
    drawValve({
      ctx,
      position: { x: 70, y: 70 },
      status: false,
    });

    expect(ctx.moveTo).toHaveBeenCalledWith(55, 70);
    expect(ctx.lineTo).toHaveBeenCalledWith(85, 70);
    expect(ctx.strokeStyle).toBe("green");
  });

  test("permanentData - renders temperature, time, and gross weight data", () => {
    const ctx = createMockContext();
    const date = new Date("2024-11-11T12:30:00");

    permanentData({
      ctx,
      tat: 15,
      sat: -5,
      time: date,
      gw: 12000,
    });

    expect(ctx.fillText).toHaveBeenNthCalledWith(1, "TAT", 20, 585);
    expect(ctx.fillText).toHaveBeenNthCalledWith(2, "+15", 70, 585);
    expect(ctx.fillText).toHaveBeenNthCalledWith(3, "ºC", 125, 585);
    expect(ctx.fillText).toHaveBeenNthCalledWith(4, "SAT", 20, 605);
    expect(ctx.fillText).toHaveBeenNthCalledWith(5, "--5", 70, 605);
    expect(ctx.fillText).toHaveBeenNthCalledWith(6, "ºC", 125, 605);
    expect(ctx.fillText).toHaveBeenNthCalledWith(7, "12", 220, 605);
    expect(ctx.fillText).toHaveBeenNthCalledWith(8, "H", 244, 605);
    expect(ctx.fillText).toHaveBeenNthCalledWith(9, "30", 260, 605);
    expect(ctx.fillText).toHaveBeenNthCalledWith(10, "GW", 340, 585);
    expect(ctx.fillText).toHaveBeenNthCalledWith(11, "12000", 375, 585);
    expect(ctx.fillText).toHaveBeenNthCalledWith(12, "KG", 425, 585);
  });

  test("permanentData - renders with other variations of temperature, time, and gross weight data", () => {
    const ctx = createMockContext();
    const date = new Date("2024-11-11T12:30:00");

    permanentData({
      ctx,
      tat: -15,
      sat: 5,
      time: date,
      gw: 12000,
    });

    expect(ctx.fillText).toHaveBeenNthCalledWith(1, "TAT", 20, 585);
    expect(ctx.fillText).toHaveBeenNthCalledWith(2, "--15", 70, 585);
    expect(ctx.fillText).toHaveBeenNthCalledWith(3, "ºC", 125, 585);
    expect(ctx.fillText).toHaveBeenNthCalledWith(4, "SAT", 20, 605);
    expect(ctx.fillText).toHaveBeenNthCalledWith(5, "+5", 70, 605);
    expect(ctx.fillText).toHaveBeenNthCalledWith(6, "ºC", 125, 605);
    expect(ctx.fillText).toHaveBeenNthCalledWith(7, "12", 220, 605);
    expect(ctx.fillText).toHaveBeenNthCalledWith(8, "H", 244, 605);
    expect(ctx.fillText).toHaveBeenNthCalledWith(9, "30", 260, 605);
    expect(ctx.fillText).toHaveBeenNthCalledWith(10, "GW", 340, 585);
    expect(ctx.fillText).toHaveBeenNthCalledWith(11, "12000", 375, 585);
    expect(ctx.fillText).toHaveBeenNthCalledWith(12, "KG", 425, 585);
  });

  test("ecamHeader - renders header with PSI values", () => {
    const ctx = createMockContext();
    ecamHeader({
      ctx,
      data: { green: 3000, blue: 2500, yellow: 2200 },
      refCoords: {
        greenLineCoords: {
          segment1: { from: { x: 100, y: 100 }, to: { x: 200, y: 100 } },
          segment2: { from: { x: 100, y: 100 }, to: { x: 200, y: 100 } },
          segment3: { from: { x: 100, y: 100 }, to: { x: 200, y: 100 } },
        },
        yellowLineCoords: { from: { x: 200, y: 100 }, to: { x: 300, y: 100 } },
        blueLineCoords: { from: { x: 300, y: 100 } },
      },
    });

    expect(ctx.fillText).toHaveBeenCalledWith("GREEN", 78, 60);
    expect(ctx.fillText).toHaveBeenCalledWith("3000", 85, 80);
    expect(ctx.fillText).toHaveBeenCalledWith("PSI", 160, 80);
    expect(ctx.fillText).toHaveBeenCalledWith("YELLOW", 280, 60);
    expect(ctx.fillText).toHaveBeenCalledWith("2200", 281, 80);
  });

  test("drawReservoir - renders the reservoir structure", () => {
    const ctx = createMockContext();
    drawReservoir({
      ctx,
      position: { x: 150, y: 200 },
      length: 40,
      height: 100,
      reservoirLevel: 60,
    });

    expect(ctx.moveTo).toHaveBeenCalledWith(130, 100);
    expect(ctx.lineTo).toHaveBeenCalledWith(190, 100);
    expect(ctx.strokeStyle).toBe("green");
    expect(ctx.stroke).toHaveBeenCalled();
  });

  test("drawText - renders text with specified color and font", () => {
    const ctx = createMockContext();
    drawText({
      ctx,
      position: { x: 10, y: 10 },
      color: "green",
      text: "Test",
      fontSize: 12,
      font: "Courier",
    });

    expect(ctx.font).toBe("12px Courier");
    expect(ctx.fillStyle).toBe("green");
    expect(ctx.fillText).toHaveBeenCalledWith("Test", 10, 10);
  });
});
