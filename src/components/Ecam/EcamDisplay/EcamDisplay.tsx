import { useEffect, useRef } from "react";
import "./EcamDisplay.scss";

const ecamDisplaySettings = {
  canvasResolutionY: 400,
  canvasResolutionX: 300,
  backgroundColor: "black",
};

export const EcamDisplay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    const scaleX = displayWidth / ecamDisplaySettings.canvasResolutionX;
    const scaleY = displayHeight / ecamDisplaySettings.canvasResolutionY;

    const scaleFactor = Math.min(scaleX, scaleY);

    canvas.width = ecamDisplaySettings.canvasResolutionX * scaleFactor;
    canvas.height = ecamDisplaySettings.canvasResolutionY * scaleFactor;

    ctx.fillStyle = ecamDisplaySettings.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Blue hydraulic line
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 100);
    ctx.lineTo(canvas.width / 2, canvas.height - 50);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 80);
    ctx.lineTo(canvas.width / 2 - 10, 100);
    ctx.lineTo(canvas.width / 2 + 10, 100);
    ctx.closePath();
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Green hydraulic line
    ctx.beginPath();
    ctx.moveTo(canvas.width / 5, 100);
    ctx.lineTo(canvas.width / 5, canvas.height - 50);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Yellow hydraulic line
    ctx.beginPath();
    ctx.moveTo(canvas.width / 1.25, 100);
    ctx.lineTo(canvas.width / 1.25, canvas.height - 50);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }, [canvasRef.current?.width, canvasRef.current?.height]);

  return <canvas ref={canvasRef} data-testid="canvas" className="canvas" />;
};
