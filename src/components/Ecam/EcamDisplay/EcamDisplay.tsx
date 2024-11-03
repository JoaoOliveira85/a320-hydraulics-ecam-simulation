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

type EcamInputs = {
  pumps: {
    engine1: boolean;
    engine2: boolean;
    powerTransferUnit: boolean;
    ramAirTurbine: boolean;
    blueElectricPump: boolean;
    yellowElectricPump: boolean;
  };
  valves: {
    engine1: boolean;
    engine2: boolean;
  };
  pressures: {
    green: number;
    blue: number;
    yellow: number;
  };
  reservoirs: {
    green: number;
    blue: number;
    yellow: number;
  };
  temps: {
    tat: number;
    sat: number;
  };
  time: Date;
  gw: number;
};

// @ts-expect-error 'data' will be used when the information starts puring in from the controls component
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const EcamDisplay = (data: EcamInputs) => {
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
      data: { green: 2900, blue: 3000, yellow: 2950 },
      refCoords: refCoords,
    });

    // Green line
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 5, y: canvas.height - 535 },
      length: 130,
      color: "green",
    });
    drawPump(ctx, { x: canvas.width / 5, y: 250 }, false);
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
    drawValve(ctx, { x: canvas.width / 5, y: canvas.height - 175 - 115 }, true);
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

    // Blue line
    ctx.font = "18px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("RAT", canvas.width / 2 - 60, 200);
    drawShape({
      ctx,
      position: { x: canvas.width / 2 - 10, y: 195 },
      size: 10,
      color: "white",
    }).triangle("right");

    drawShape({
      ctx,
      position: { x: canvas.width / 2 + 117, y: 150 },
      size: 15,
      color: "green",
    }).triangle("right");
    ctx.font = "18px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("PTU", canvas.width / 2 + 62, 156);
    drawShape({
      ctx,
      position: { x: canvas.width / 2 + 40, y: 150 },
      size: 15,
      color: "green",
    }).triangle("left");
    drawLine({
      ctx,
      orientation: "horizontal",
      from: { x: canvas.width / 2 + 15, y: 150 },
      length: 25,
      color: "green",
    });
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 150, 15, Math.PI, Math.PI * 2, true);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 3;
    ctx.stroke();
    drawLine({
      ctx,
      orientation: "horizontal",
      from: { x: canvas.width / 2 - 65, y: 150 },
      length: 50,
      color: "green",
    });
    drawShape({
      ctx,
      position: { x: canvas.width / 2 - 80, y: 150 },
      size: 15,
      color: "green",
    }).triangle("left");

    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: canvas.width / 2, y: canvas.height - 535 },
      length: 210,
      color: "green",
    });
    drawPump(ctx, { x: canvas.width / 2, y: 330 }, false);
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
      color: "green",
    });
    ctx.font = "18px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("ELEC", canvas.width / 1.25 + 30, 200);
    drawPump(ctx, { x: canvas.width / 1.25, y: 250 }, false);
    drawShape({
      ctx,
      position: { x: canvas.width / 1.25 + 15, y: 195 },
      size: 10,
      color: "white",
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
      false,
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
  }, [canvasRef.current?.width, canvasRef.current?.height]);

  return <canvas ref={canvasRef} data-testid="canvas" className="canvas" />;
};
