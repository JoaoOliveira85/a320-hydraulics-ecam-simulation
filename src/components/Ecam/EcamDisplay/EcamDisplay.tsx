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

import EN from "constants/EN.json";

const ECAM_SETTINGS = {
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
  reservoires: {
    green: number;
    blue: number;
    yellow: number;
  };
  pumps: {
    engine1: boolean;
    engine2: boolean;
    blueElectricPump: boolean;
    ramAirTurbine: boolean;
    yellowElectricPump: boolean;
  };
  valves: {
    engine1: boolean;
    engine2: boolean;
  };
  ptus: {
    powerTransferUnit: boolean;
  };
  other: {
    airTemperature: number;
    grossWeight: number;
  };
}

export const EcamDisplay = ({
  pressures,
  reservoires,
  pumps,
  valves,
  ptus,
  other,
}: EcampDisplayProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = ECAM_SETTINGS.canvasResolutionX;
    canvas.height = ECAM_SETTINGS.canvasResolutionY;

    ctx.fillStyle = ECAM_SETTINGS.backgroundColor;
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
      color: `${(pumps.engine1 && valves.engine1) || (pumps.engine2 && valves.engine2 && ptus.powerTransferUnit) || (pumps.yellowElectricPump && ptus.powerTransferUnit) ? "green" : "orange"}`,
    });
    drawPump(
      ctx,
      { x: canvas.width / 5, y: 250 },
      pumps.engine1,
      `${(pumps.engine1 && valves.engine1) || (pumps.engine2 && valves.engine2 && ptus.powerTransferUnit) || (pumps.yellowElectricPump && ptus.powerTransferUnit) ? "green" : "orange"}`,
    );
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(EN.ecam_display.one, canvas.width / 5 + 25, 260);
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
    drawReservoir(
      ctx,
      canvas.width / 5,
      canvas.height - 95,
      6,
      130,
      reservoires.green,
    );

    const ptuActive =
      ptus.powerTransferUnit &&
      (((!pumps.engine1 || !valves.engine1) &&
        pumps.engine2 &&
        valves.engine2) ||
        (pumps.engine1 &&
          valves.engine1 &&
          (!pumps.engine2 || !valves.engine2)));
    let ptuLineColor = "black";
    if (ptuActive) {
      ptuLineColor = ptus.powerTransferUnit ? "green" : "orange";
    }
    // Blue line
    ctx.font = "18px Arial";
    ctx.fillStyle = `${pumps.ramAirTurbine ? "green" : "white"}`;
    ctx.fillText(EN.ecam_display.rat, canvas.width / 2 - 60, 200);
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
      color: `${ptus.powerTransferUnit ? "green" : "orange"}`,
      fill: ptuActive,
    }).triangle("right");
    ctx.font = "18px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(EN.ecam_display.ptu, canvas.width / 2 + 62, 156);
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
      color: `${ptus.powerTransferUnit ? "green" : "orange"}`,
      fill: ptuActive,
    }).triangle(ptuActive ? "right" : "left");
    drawLine({
      ctx,
      orientation: "horizontal",
      from: { x: canvas.width / 2 + 15, y: 150 },
      length: 25,
      color: `${ptus.powerTransferUnit ? "green" : "orange"}`,
    });
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 150, 15, Math.PI, Math.PI * 2, true);
    ctx.strokeStyle = `${ptus.powerTransferUnit ? "green" : "orange"}`;
    ctx.lineWidth = 3;
    ctx.stroke();
    drawLine({
      ctx,
      orientation: "horizontal",
      from: { x: canvas.width / 2 - 65, y: 150 },
      length: 50,
      color: `${ptus.powerTransferUnit ? "green" : "orange"}`,
    });
    drawShape({
      ctx,
      position: { x: canvas.width / 2 - 74, y: 150 },
      size: 15,
      color: `${ptus.powerTransferUnit ? "green" : "orange"}`,
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
    drawReservoir(
      ctx,
      canvas.width / 2,
      canvas.height - 95,
      6,
      130,
      reservoires.blue,
    );

    // Yellow line
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 1.25, y: canvas.height - 535 },
      length: 130,
      color: `${(pumps.engine2 && valves.engine2) || (pumps.engine1 && valves.engine1 && ptus.powerTransferUnit) || pumps.yellowElectricPump ? "green" : "orange"}`,
    });
    ctx.font = "18px Arial";
    ctx.fillStyle = `${pumps.yellowElectricPump ? "green" : "white"}`;
    ctx.fillText(EN.ecam_display.elec, canvas.width / 1.25 + 30, 200);
    drawPump(
      ctx,
      { x: canvas.width / 1.25, y: 250 },
      pumps.engine2,
      `${(pumps.engine2 && valves.engine2) || (pumps.engine1 && valves.engine1 && ptus.powerTransferUnit) || pumps.yellowElectricPump ? "green" : "orange"}`,
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
    ctx.fillText(EN.ecam_display.two, canvas.width / 1.25 - 40, 290);
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
    drawReservoir(
      ctx,
      canvas.width / 1.25,
      canvas.height - 95,
      6,
      130,
      reservoires.yellow,
    );

    permanentData({
      ctx,
      tat: other.airTemperature,
      sat: other.airTemperature,
      time: new Date(),
      gw: other.grossWeight,
    });
  }, [
    canvasRef.current?.width,
    canvasRef.current?.height,
    pressures,
    pumps.engine1,
    pumps.engine2,
    pumps.blueElectricPump,
    ptus.powerTransferUnit,
    pumps.yellowElectricPump,
    pumps.ramAirTurbine,
    valves.engine1,
    valves.engine2,
    reservoires.green,
    reservoires.blue,
    reservoires.yellow,
    other.airTemperature,
    other.grossWeight,
  ]);

  return <canvas ref={canvasRef} data-testid="canvas" className="canvas" />;
};
