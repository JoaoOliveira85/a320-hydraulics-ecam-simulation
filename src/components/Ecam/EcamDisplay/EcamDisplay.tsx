import { useEffect, useRef } from "react";
import "./EcamDisplay.scss";

const ecamDisplaySettings = {
  canvasResolutionY: 400,
  canvasResolutionX: 300,
  backgroundColor: "navy",
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

    ctx.font = `${30 * scaleFactor}px Arial`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Hello World", canvas.width / 2, 50 * scaleFactor);

    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      20 * scaleFactor,
      0,
      2 * Math.PI,
    );
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
  }, [canvasRef.current?.width, canvasRef.current?.height]);

  return <canvas ref={canvasRef} data-testid="canvas" className="canvas" />;
};
