import {
  DrawLineProps,
  DrawShapeProps,
  DrawPumpProps,
  DrawValveProps,
  PermanentDataProps,
  EcamHeaderProps,
  drawResrvoirProps,
  DrawTextProps,
} from "types";

const CANVAS_SIZE = {
  width: 480,
  height: 640,
};

export const drawLine = ({
  ctx,
  orientation,
  from,
  length,
  color,
  width = 3,
}: DrawLineProps) => {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);

  if (orientation === "horizontal") {
    ctx.lineTo(from.x + length, from.y);
  } else if (orientation === "vertical") {
    ctx.lineTo(from.x, from.y + length);
  }
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.closePath();
};

export const drawShape = ({
  ctx,
  position,
  size,
  color,
  fill = false,
}: DrawShapeProps) => {
  return {
    circle: () => {
      ctx.beginPath();
      ctx.arc(position.x, position.y, size, 0, 2 * Math.PI);
      ctx.strokeStyle = color;
      if (fill) {
        ctx.fillStyle = color;
        ctx.fill();
      }
      ctx.stroke();
      ctx.closePath();
    },
    square: () => {
      ctx.beginPath();
      ctx.rect(position.x - size / 2, position.y - size / 2, size, size);
      ctx.strokeStyle = color;
      if (fill) {
        ctx.fillStyle = color;
        ctx.fill();
      }
      ctx.stroke();
      ctx.closePath();
    },
    triangle: (pointing: "up" | "down" | "left" | "right") => {
      ctx.beginPath();
      if (pointing === "up") {
        ctx.moveTo(position.x, position.y - size / 2);
        ctx.lineTo(position.x - size / 2, position.y + size / 2);
        ctx.lineTo(position.x + size / 2, position.y + size / 2);
      } else if (pointing === "down") {
        ctx.moveTo(position.x, position.y + size / 2);
        ctx.lineTo(position.x - size / 2, position.y - size / 2);
        ctx.lineTo(position.x + size / 2, position.y - size / 2);
      } else if (pointing === "left") {
        ctx.moveTo(position.x - size / 2, position.y);
        ctx.lineTo(position.x + size / 2, position.y - size / 2);
        ctx.lineTo(position.x + size / 2, position.y + size / 2);
      } else if (pointing === "right") {
        ctx.moveTo(position.x + size / 2, position.y);
        ctx.lineTo(position.x - size / 2, position.y - size / 2);
        ctx.lineTo(position.x - size / 2, position.y + size / 2);
      }
      if (fill) {
        ctx.fillStyle = color;
        ctx.fill();
      }
      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.stroke();
    },
  };
};

export const drawPump = ({
  ctx,
  position,
  status,
  color = "green",
  size = 30,
}: DrawPumpProps) => {
  drawShape({ ctx, position, size, color: color }).square();

  if (status) {
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: position.x, y: position.y - size / 2 },
      length: size,
      color: color,
    });
  } else {
    drawLine({
      ctx,
      orientation: "horizontal",
      from: { x: position.x - size / 2, y: position.y },
      length: size,
      color: color,
    });
  }
};

export const drawValve = ({
  ctx,
  position,
  status,
  size = 15,
}: DrawValveProps) => {
  drawShape({ ctx, position, size, color: "green" }).circle();

  if (status) {
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: position.x, y: position.y - size },
      length: size * 2,
      color: "green",
    });
  } else {
    drawLine({
      ctx,
      orientation: "horizontal",
      from: { x: position.x - size, y: position.y },
      length: size * 2,
      color: "green",
    });
  }
};

export const permanentData = ({
  ctx,
  tat,
  sat,
  time,
  gw,
}: PermanentDataProps) => {
  const leftOffset = 40;
  const topOffset = 20;
  const lineOffset = 20;
  const columnOffset = 150;

  const fontSize = 16;

  const bottomBoxReferences = {
    top: CANVAS_SIZE.height - 75,
    bottom: CANVAS_SIZE.height,
  };

  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "white";
  ctx.fillText(`TAT`, leftOffset - 20, bottomBoxReferences.top + topOffset);
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "green";
  ctx.fillText(
    `${tat > 0 ? "+" : "-"}${tat}`,
    leftOffset + 30,
    bottomBoxReferences.top + topOffset,
  );
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "skyblue";
  ctx.fillText(`ºC`, leftOffset + 85, bottomBoxReferences.top + topOffset);

  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "white";
  ctx.fillText(
    "SAT",
    leftOffset - 20,
    bottomBoxReferences.top + topOffset + lineOffset,
  );
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "green";
  ctx.fillText(
    `${sat > 0 ? "+" : "-"}${sat}`,
    leftOffset + 30,
    bottomBoxReferences.top + topOffset + lineOffset,
  );
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "skyblue";
  ctx.fillText(
    `ºC`,
    leftOffset + 85,
    bottomBoxReferences.top + topOffset + lineOffset,
  );

  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "green";
  ctx.fillText(
    `${time.getHours()}`,
    leftOffset + columnOffset + 30,
    bottomBoxReferences.top + topOffset * 2,
  );
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "skyblue";
  ctx.fillText(
    `H`,
    leftOffset + columnOffset + 54,
    bottomBoxReferences.top + topOffset * 2,
  );
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "green";
  ctx.fillText(
    `${time.getMinutes()}`,
    leftOffset + columnOffset + 70,
    bottomBoxReferences.top + topOffset * 2,
  );

  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "white";
  ctx.fillText(
    "GW",
    leftOffset + columnOffset * 2,
    bottomBoxReferences.top + topOffset,
  );
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "green";
  ctx.fillText(
    `${gw}`,
    leftOffset + columnOffset * 2 + 35,
    bottomBoxReferences.top + topOffset,
  );
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = "skyblue";
  ctx.fillText(
    `KG`,
    leftOffset + columnOffset * 2 + 85,
    bottomBoxReferences.top + topOffset,
  );

  drawLine({
    ctx,
    orientation: "horizontal",
    from: { x: 0, y: bottomBoxReferences.top },
    length: CANVAS_SIZE.width,
    color: "white",
  });
  drawLine({
    ctx,
    orientation: "vertical",
    from: { x: CANVAS_SIZE.width / 3, y: bottomBoxReferences.top },
    length: CANVAS_SIZE.height - bottomBoxReferences.top,
    color: "white",
  });
  drawLine({
    ctx,
    orientation: "vertical",
    from: { x: CANVAS_SIZE.width / 1.5, y: bottomBoxReferences.top },
    length: CANVAS_SIZE.height - bottomBoxReferences.top,
    color: "white",
  });
};

export const ecamHeader = ({
  ctx,
  data: { green, blue, yellow },
  refCoords,
}: EcamHeaderProps) => {
  const { greenLineCoords, yellowLineCoords, blueLineCoords } = refCoords;

  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("HYD", CANVAS_SIZE.width / 2 - 20, 20);
  drawLine({
    ctx,
    orientation: "horizontal",
    from: { x: CANVAS_SIZE.width / 2 - 21, y: 25 },
    length: 45,
    color: "white",
  });

  ctx.font = "18px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("GREEN", greenLineCoords.segment1.from.x - 22, 60);

  ctx.font = "18px Arial";
  ctx.fillStyle = "green";
  ctx.fillText(`${green}`, greenLineCoords.segment1.from.x - 15, 80);

  ctx.font = "18px Arial";
  ctx.fillStyle = "skyblue";
  ctx.fillText("PSI", greenLineCoords.segment1.from.x + 60, 80);

  ctx.font = "18px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("BLUE", yellowLineCoords.from.x - 22, 60);

  ctx.font = "18px Arial";
  ctx.fillStyle = "skyblue";
  ctx.fillText("PSI", yellowLineCoords.from.x + 60, 80);

  ctx.font = "18px Arial";
  ctx.fillStyle = "green";
  ctx.fillText(`${blue}`, yellowLineCoords.from.x - 15, 80);

  ctx.font = "18px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("YELLOW", blueLineCoords.from.x - 20, 60);

  ctx.font = "18px Arial";
  ctx.fillStyle = "green";
  ctx.fillText(`${yellow}`, blueLineCoords.from.x - 19, 80);
};

export const drawReservoir = ({
  ctx,
  position: { x, y },
  length,
  height,
  reservoirLevel,
}: drawResrvoirProps) => {
  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.lineWidth = 3;

  ctx.moveTo(x - length / 2, y - height);
  ctx.lineTo(x + length, y - height);
  ctx.lineTo(x + length, y - height + length * 3);
  ctx.lineTo(x - length / 4, y - height + length * 3);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.lineWidth = 3;
  ctx.moveTo(x, y - (height / 100) * reservoirLevel);
  ctx.lineTo(x - length - 1, y - (height / 100) * reservoirLevel - length * 2);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.strokeStyle = "orange";
  ctx.lineWidth = 3;
  ctx.moveTo(x, y);
  ctx.lineTo(x + length, y);
  ctx.lineTo(x + length, y - 30);
  ctx.lineTo(x - length / 4, y - 30);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.lineWidth = 3;
  ctx.moveTo(x, y);
  ctx.lineTo(x - length, y);
  ctx.lineTo(x - length, y - (height / 100) * reservoirLevel);
  ctx.lineTo(x + length / 2, y - (height / 100) * reservoirLevel);

  ctx.stroke();
  ctx.closePath();
};

export const drawText = ({
  ctx,
  position,
  color,
  text,
  fontSize = 16,
  font = "Arial",
}: DrawTextProps) => {
  ctx.font = `${fontSize}px ${font}`;
  ctx.fillStyle = color;
  ctx.fillText(text, position.x, position.y);
};
