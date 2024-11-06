import { useEffect, useRef } from "react";
import "./EcamDisplay.scss";
import {
  drawLine,
  drawPump,
  drawReservoir,
  drawShape,
  drawValve,
  ecamHeader,
  permanentData,
} from "utils";

const ecamDisplaySettings = {
  canvasResolutionY: 640,
  canvasResolutionX: 480,
  backgroundColor: "black",
};

interface EcampDisplayProps {
  pressures: {
    green: number;
    blue: number;
    yellow: number;
  };
  pumps: {
    engine1: boolean;
    engine2: boolean;
    blueElectricPump: boolean;
    powerTransferUnit: boolean;
    ramAirTurbine: boolean;
    yellowElectricPump: boolean;
  };
  valves: {
    engine1: boolean;
    engine2: boolean;
  };
}

export const EcamDisplay = ({
  pressures,
  pumps,
  valves,
}: EcampDisplayProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = ecamDisplaySettings.canvasResolutionX;
    canvas.height = ecamDisplaySettings.canvasResolutionY;

    ctx.fillStyle = ecamDisplaySettings.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const refCoords = {
      greenLineCoords: {
        segment1: {
          from: { x: canvas.width / 5, y: 207 },
          to: { x: canvas.width / 5, y: 196 },
        },
        segment2: {
          from: { x: canvas.width / 5, y: 140 },
          to: { x: canvas.width / 5, y: 180 },
        },
        segment3: {
          from: { x: canvas.width / 5, y: 50 },
          to: { x: canvas.width / 5, y: 125 },
        },
      },
      yellowLineCoords: {
        from: { x: canvas.width / 2, y: 207 },
        to: { x: canvas.width / 2, y: 125 },
      },
      blueLineCoords: {
        from: { x: canvas.width / 1.25, y: 207 },
      },
    };

    ecamHeader({
      ctx,
      data: {
        green: pressures.green,
        blue: pressures.blue,
        yellow: pressures.yellow,
      },
      refCoords: refCoords,
    });

    // Green line
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 5, y: canvas.height - 535 },
      length: 130,
      color: `${(pumps.engine1 && valves.engine1) || (pumps.engine2 && valves.engine2 && pumps.powerTransferUnit) || (pumps.yellowElectricPump && pumps.powerTransferUnit) ? "green" : "orange"}`,
    });
    drawPump(
      ctx,
      { x: canvas.width / 5, y: 250 },
      pumps.engine1,
      `${(pumps.engine1 && valves.engine1) || (pumps.engine2 && valves.engine2 && pumps.powerTransferUnit) || (pumps.yellowElectricPump && pumps.powerTransferUnit) ? "green" : "orange"}`,
    );
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("1", canvas.width / 5 + 25, 260);
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 5, y: canvas.height - 175 - 200 },
      length: 70,
      color: "green",
    });
    drawValve(
      ctx,
      { x: canvas.width / 5, y: canvas.height - 175 - 115 },
      valves.engine1,
    );
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 5, y: canvas.height - 225 - 50 },
      length: 50,
      color: "green",
    });
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 5, y: canvas.height - 225 },
      length: 130,
      color: "white",
      width: 2,
    });
    drawReservoir(ctx, canvas.width / 5, canvas.height - 95, 6, 130, 15);

    const ptuActive =
      pumps.powerTransferUnit &&
      (((!pumps.engine1 || !valves.engine1) &&
        pumps.engine2 &&
        valves.engine2) ||
        (pumps.engine1 &&
          valves.engine1 &&
          (!pumps.engine2 || !valves.engine2)));
    const ptuLineColor = !ptuActive
      ? "black"
      : pumps.powerTransferUnit
        ? "green"
        : "orange";
    // Blue line
    ctx.font = "18px Arial";
    ctx.fillStyle = `${pumps.ramAirTurbine ? "green" : "white"}`;
    ctx.fillText("RAT", canvas.width / 2 - 60, 200);
    drawShape({
      ctx,
      position: { x: canvas.width / 2 - 15, y: 193 },
      size: 10,
      color: `${pumps.ramAirTurbine ? "green" : "white"}`,
      fill: pumps.ramAirTurbine,
    }).triangle("right");

    drawShape({
      ctx,
      position: { x: canvas.width / 2 + 110, y: 150 },
      size: 15,
      color: `${pumps.powerTransferUnit ? "green" : "orange"}`,
      fill: ptuActive,
    }).triangle("right");
    ctx.font = "18px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("PTU", canvas.width / 2 + 62, 156);
    drawLine({
      ctx,
      orientation: "horizontal",
      from: { x: canvas.width / 2 - 143, y: 150 },
      length: 62,
      color: ptuLineColor,
    });
    drawShape({
      ctx,
      position: { x: canvas.width / 2 + 45, y: 150 },
      size: 15,
      color: `${pumps.powerTransferUnit ? "green" : "orange"}`,
      fill: ptuActive,
    }).triangle(ptuActive ? "right" : "left");
    drawLine({
      ctx,
      orientation: "horizontal",
      from: { x: canvas.width / 2 + 15, y: 150 },
      length: 25,
      color: `${pumps.powerTransferUnit ? "green" : "orange"}`,
    });
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 150, 15, Math.PI, Math.PI * 2, true);
    ctx.strokeStyle = `${pumps.powerTransferUnit ? "green" : "orange"}`;
    ctx.lineWidth = 3;
    ctx.stroke();
    drawLine({
      ctx,
      orientation: "horizontal",
      from: { x: canvas.width / 2 - 65, y: 150 },
      length: 50,
      color: `${pumps.powerTransferUnit ? "green" : "orange"}`,
    });
    drawShape({
      ctx,
      position: { x: canvas.width / 2 - 74, y: 150 },
      size: 15,
      color: `${pumps.powerTransferUnit ? "green" : "orange"}`,
      fill: ptuActive,
    }).triangle(ptuActive ? "right" : "left");
    drawLine({
      ctx,
      orientation: "horizontal",
      from: { x: canvas.width / 2 + 118, y: 150 },
      length: 27,
      color: ptuLineColor,
    });

    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 2, y: canvas.height - 535 },
      length: 210,
      color: "green",
    });
    drawPump(ctx, { x: canvas.width / 2, y: 330 }, pumps.blueElectricPump);
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 2, y: canvas.height - 295 },
      length: 70,
      color: "green",
    });
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 2, y: canvas.height - 225 },
      length: 130,
      color: "white",
      width: 2,
    });
    drawReservoir(ctx, canvas.width / 2, canvas.height - 95, 6, 130, 15);

    // Yellow line
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 1.25, y: canvas.height - 535 },
      length: 130,
      color: `${(pumps.engine2 && valves.engine2) || (pumps.engine1 && valves.engine1 && pumps.powerTransferUnit) || pumps.yellowElectricPump ? "green" : "orange"}`,
    });
    ctx.font = "18px Arial";
    ctx.fillStyle = `${pumps.yellowElectricPump ? "green" : "white"}`;
    ctx.fillText("ELEC", canvas.width / 1.25 + 30, 200);
    drawPump(
      ctx,
      { x: canvas.width / 1.25, y: 250 },
      pumps.engine2,
      `${(pumps.engine2 && valves.engine2) || (pumps.engine1 && valves.engine1 && pumps.powerTransferUnit) || pumps.yellowElectricPump ? "green" : "orange"}`,
    );
    drawShape({
      ctx,
      position: { x: canvas.width / 1.25 + 15, y: 195 },
      size: 10,
      color: `${pumps.yellowElectricPump ? "green" : "white"}`,
      fill: pumps.yellowElectricPump,
    }).triangle("left");
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("2", canvas.width / 1.25 - 40, 290);
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 1.25, y: canvas.height - 175 - 200 },
      length: 70,
      color: "green",
    });
    drawValve(
      ctx,
      { x: canvas.width / 1.255, y: canvas.height - 175 - 115 },
      valves.engine2,
    );
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 1.25, y: canvas.height - 225 - 50 },
      length: 50,
      color: "green",
    });
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 1.25, y: canvas.height - 225 },
      length: 130,
      color: "white",
      width: 2,
    });
    drawReservoir(ctx, canvas.width / 1.25, canvas.height - 95, 6, 130, 20);

    permanentData({ ctx, tat: 14, sat: 14, time: new Date(), gw: 46420 });
  }, [
    canvasRef.current?.width,
    canvasRef.current?.height,
    pressures,
    pumps.engine1,
    pumps.engine2,
    pumps.blueElectricPump,
    pumps.powerTransferUnit,
    pumps.yellowElectricPump,
    pumps.ramAirTurbine,
    valves.engine1,
    valves.engine2,
  ]);

  return <canvas ref={canvasRef} data-testid="canvas" className="canvas" />;
};
