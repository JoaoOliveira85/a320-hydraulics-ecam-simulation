import { useEffect, useRef } from "react";
import "./EcamDisplay.scss";
import {
  drawLine,
  drawPump,
  drawReservoir,
  drawShape,
  drawValve,
  drawText,
  ecamHeader,
  permanentData,
} from "utils";

import { EcamColors } from "types";

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
  renderCanvas?: boolean;
}

export const EcamDisplay = ({
  pressures,
  reservoires,
  pumps,
  valves,
  ptus,
  other,
  renderCanvas = true,
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
      color: `${(pumps.engine1 && valves.engine1) || (pumps.engine2 && valves.engine2 && ptus.powerTransferUnit) || (pumps.yellowElectricPump && ptus.powerTransferUnit) ? EcamColors["green"] : EcamColors["orange"]}`,
    });
    drawPump({
      ctx,
      position: { x: canvas.width / 5, y: 250 },
      status: pumps.engine1,
      color: `${(pumps.engine1 && valves.engine1) || (pumps.engine2 && valves.engine2 && ptus.powerTransferUnit) || (pumps.yellowElectricPump && ptus.powerTransferUnit) ? EcamColors["green"] : EcamColors["orange"]}`,
    });
    drawText({
      ctx,
      position: { x: canvas.width / 5 + 25, y: 290 },
      color: EcamColors["white"],
      text: EN.ecam_display.one,
      fontSize: 24,
    });
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 5, y: canvas.height - 175 - 200 },
      length: 70,
      color: EcamColors["green"],
    });
    drawValve({
      ctx,
      position: { x: canvas.width / 5, y: canvas.height - 175 - 115 },
      status: valves.engine1,
    });
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 5, y: canvas.height - 225 - 50 },
      length: 50,
      color: EcamColors["green"],
    });
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 5, y: canvas.height - 225 },
      length: 130,
      color: EcamColors["white"],
      width: 2,
    });
    drawReservoir({
      ctx,
      position: {
        x: canvas.width / 5,
        y: canvas.height - 95,
      },
      length: 6,
      height: 130,
      reservoirLevel: reservoires.green,
    });

    const ptuActive =
      ptus.powerTransferUnit &&
      (((!pumps.engine1 || !valves.engine1) &&
        pumps.engine2 &&
        valves.engine2) ||
        (pumps.engine1 &&
          valves.engine1 &&
          (!pumps.engine2 || !valves.engine2)));

    // Blue line
    drawText({
      ctx,
      position: { x: canvas.width / 2 - 60, y: 200 },
      color: `${pumps.ramAirTurbine ? EcamColors["green"] : EcamColors["white"]}`,
      text: EN.ecam_display.rat,
    });
    drawShape({
      ctx,
      position: { x: canvas.width / 2 - 15, y: 193 },
      size: 10,
      color: `${pumps.ramAirTurbine ? EcamColors["green"] : EcamColors["white"]}`,
      fill: pumps.ramAirTurbine,
    }).triangle("right");

    drawShape({
      ctx,
      position: { x: canvas.width / 2 + 110, y: 150 },
      size: 15,
      color: `${ptus.powerTransferUnit ? EcamColors["green"] : EcamColors["orange"]}`,
      fill: ptuActive,
    }).triangle("right");
    drawText({
      ctx,
      position: { x: canvas.width / 2 + 62, y: 156 },
      color: EcamColors["white"],
      text: EN.ecam_display.ptu,
    });
    drawLine({
      ctx,
      orientation: "horizontal",
      from: { x: canvas.width / 2 - 143, y: 150 },
      length: 62,
      color: ptuActive ? "green" : "black",
    });
    drawShape({
      ctx,
      position: { x: canvas.width / 2 + 45, y: 150 },
      size: 15,
      color: `${ptus.powerTransferUnit ? EcamColors["green"] : EcamColors["orange"]}`,
      fill: ptuActive,
    }).triangle(ptuActive ? "right" : "left");
    drawLine({
      ctx,
      orientation: "horizontal",
      from: { x: canvas.width / 2 + 15, y: 150 },
      length: 25,
      color: `${ptus.powerTransferUnit ? EcamColors["green"] : EcamColors["orange"]}`,
    });
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 150, 15, Math.PI, Math.PI * 2, true);
    ctx.strokeStyle = `${ptus.powerTransferUnit ? EcamColors["green"] : EcamColors["orange"]}`;
    ctx.lineWidth = 3;
    ctx.stroke();
    drawLine({
      ctx,
      orientation: "horizontal",
      from: { x: canvas.width / 2 - 65, y: 150 },
      length: 50,
      color: `${ptus.powerTransferUnit ? EcamColors["green"] : EcamColors["orange"]}`,
    });
    drawShape({
      ctx,
      position: { x: canvas.width / 2 - 74, y: 150 },
      size: 15,
      color: `${ptus.powerTransferUnit ? EcamColors["green"] : EcamColors["orange"]}`,
      fill: ptuActive,
    }).triangle(ptuActive ? "right" : "left");
    drawLine({
      ctx,
      orientation: "horizontal",
      from: { x: canvas.width / 2 + 118, y: 150 },
      length: 27,
      color: ptuActive ? "green" : "black",
    });

    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 2, y: canvas.height - 535 },
      length: 210,
      color: EcamColors["green"],
    });
    drawPump({
      ctx,
      position: { x: canvas.width / 2, y: 330 },
      status: pumps.blueElectricPump,
    });
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 2, y: canvas.height - 295 },
      length: 70,
      color: EcamColors["green"],
    });
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 2, y: canvas.height - 225 },
      length: 130,
      color: EcamColors["white"],
      width: 2,
    });
    drawReservoir({
      ctx,
      position: {
        x: canvas.width / 2,
        y: canvas.height - 95,
      },
      length: 6,
      height: 130,
      reservoirLevel: reservoires.blue,
    });

    // Yellow line
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 1.25, y: canvas.height - 535 },
      length: 130,
      color: `${(pumps.engine2 && valves.engine2) || (pumps.engine1 && valves.engine1 && ptus.powerTransferUnit) || pumps.yellowElectricPump ? EcamColors["green"] : EcamColors["orange"]}`,
    });
    ctx.font = "18px Arial";
    ctx.fillStyle = `${pumps.yellowElectricPump ? EcamColors["green"] : EcamColors["white"]}`;
    ctx.fillText(EN.ecam_display.elec, canvas.width / 1.25 + 30, 200);
    drawPump({
      ctx,
      position: { x: canvas.width / 1.25, y: 250 },
      status: pumps.engine2,
      color: `${(pumps.engine2 && valves.engine2) || (pumps.engine1 && valves.engine1 && ptus.powerTransferUnit) || pumps.yellowElectricPump ? EcamColors["green"] : EcamColors["orange"]}`,
    });
    drawShape({
      ctx,
      position: { x: canvas.width / 1.25 + 15, y: 195 },
      size: 10,
      color: `${pumps.yellowElectricPump ? EcamColors["green"] : EcamColors["white"]}`,
      fill: pumps.yellowElectricPump,
    }).triangle("left");
    drawText({
      ctx,
      position: { x: canvas.width / 1.25 - 40, y: 290 },
      color: EcamColors["white"],
      text: EN.ecam_display.two,
      fontSize: 24,
    });
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 1.25, y: canvas.height - 175 - 200 },
      length: 70,
      color: EcamColors["green"],
    });
    drawValve({
      ctx,
      position: { x: canvas.width / 1.255, y: canvas.height - 175 - 115 },
      status: valves.engine2,
    });
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 1.25, y: canvas.height - 225 - 50 },
      length: 50,
      color: EcamColors["green"],
    });
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 1.25, y: canvas.height - 225 },
      length: 130,
      color: EcamColors["white"],
      width: 2,
    });
    drawReservoir({
      ctx,
      position: {
        x: canvas.width / 1.25,
        y: canvas.height - 95,
      },
      length: 6,
      height: 130,
      reservoirLevel: reservoires.yellow,
    });

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

  return (
    <>
      {renderCanvas ? (
        <canvas ref={canvasRef} data-testid="canvas" className="canvas" />
      ) : null}
    </>
  );
};
