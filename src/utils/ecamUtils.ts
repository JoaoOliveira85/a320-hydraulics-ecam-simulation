type Position = { x: number; y: number };

type PermanentData = {
  ctx: CanvasRenderingContext2D;
  tat: number;
  sat: number;
  time: Date;
  gw: number;
};

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
}: {
  ctx: CanvasRenderingContext2D;
  orientation: "horizontal" | "vertical";
  from: Position;
  length: number;
  color: string;
  width?: number;
}) => {
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
}: {
  ctx: CanvasRenderingContext2D;
  position: Position;
  size: number;
  color: string;
}) => {
  return {
    circle: () => {
      ctx.beginPath();
      ctx.arc(position.x, position.y, size, 0, 2 * Math.PI);
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.closePath();
    },
    square: () => {
      ctx.beginPath();
      ctx.rect(position.x - size / 2, position.y - size / 2, size, size);
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.closePath();
    },
    triangle: (pointing: "up" | "down" | "left" | "right") => {
      ctx.beginPath();
      if (pointing === "up") {
        ctx.moveTo(position.x, position.y);
        ctx.lineTo(position.x - size / 2, position.y + size);
        ctx.lineTo(position.x + size / 2, position.y + size);
      } else if (pointing === "down") {
        ctx.moveTo(position.x, position.y);
        ctx.lineTo(position.x - size / 2, position.y - size);
        ctx.lineTo(position.x + size / 2, position.y - size);
      } else if (pointing === "left") {
        ctx.moveTo(position.x, position.y);
        ctx.lineTo(position.x + size, position.y - size / 2);
        ctx.lineTo(position.x + size, position.y + size / 2);
      } else if (pointing === "right") {
        ctx.moveTo(position.x, position.y);
        ctx.lineTo(position.x - size, position.y - size / 2);
        ctx.lineTo(position.x - size, position.y + size / 2);
      }
      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.stroke();
    },
  };
};

export const drawPump = (
  ctx: CanvasRenderingContext2D,
  position: Position,
  status: boolean,
  size = 30,
) => {
  // Draw the pump square
  drawShape({ ctx, position, size, color: "green" }).square();

  // Draw the pump line, based on status
  if (status) {
    // Draw a vertical line going down from the center of the square
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: position.x, y: position.y - size / 2 },
      length: size,
      color: "green",
    });
  } else {
    // Draw a horizontal line through the center of the square
    drawLine({
      ctx,
      orientation: "horizontal",
      from: { x: position.x - size / 2, y: position.y },
      length: size,
      color: "green",
    });
  }
};

export const drawValve = (
  ctx: CanvasRenderingContext2D,
  position: Position,
  status: boolean,
  size = 15,
) => {
  // Draw the valve circle
  drawShape({ ctx, position, size, color: "green" }).circle();

  // Draw the valve line, based on status
  if (status) {
    // Draw a vertical line through the valve
    drawLine({
      ctx,
      orientation: "vertical",
      from: { x: position.x, y: position.y - size },
      length: size * 2,
      color: "green",
    });
  } else {
    // Draw a horizontal line through the valve
    drawLine({
      ctx,
      orientation: "horizontal",
      from: { x: position.x - size, y: position.y },
      length: size * 2,
      color: "green",
    });
  }
};

export const permanentData = ({ ctx, tat, sat, time, gw }: PermanentData) => {
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

type EcamHeader = {
  ctx: CanvasRenderingContext2D;
  data: {
    green: number;
    blue: number;
    yellow: number;
  };
  refCoords: {
    greenLineCoords: {
      segment1: { from: Position; to: Position };
      segment2: { from: Position; to: Position };
      segment3: { from: Position; to: Position };
    };
    yellowLineCoords: { from: Position; to: Position };
    blueLineCoords: { from: Position };
  };
};

export const ecamHeader = ({
  ctx,
  data: { green, blue, yellow },
  refCoords,
}: EcamHeader) => {
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
  ctx.fillText(`${yellow}`, yellowLineCoords.from.x - 15, 80);

  ctx.font = "18px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("YELLOW", blueLineCoords.from.x - 20, 60);

  ctx.font = "18px Arial";
  ctx.fillStyle = "green";
  ctx.fillText(`${blue}`, blueLineCoords.from.x - 19, 80);
};

export const drawReservoir = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  length: number,
  height: number,
  reservoirLevel: number,
) => {
  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.lineWidth = 3;
  ctx.moveTo(x, y);
  ctx.lineTo(x - length, y);
  ctx.lineTo(x - length, y - height);
  ctx.lineTo(x + length, y - height);
  ctx.lineTo(x + length, y - height + length * 3);
  ctx.lineTo(x - length / 4, y - height + length * 3);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.lineWidth = 3;
  ctx.moveTo(x, y - height);
  ctx.lineTo(x - length - 1, y - height - length * 2);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.strokeStyle = "orange";
  ctx.lineWidth = 3;
  ctx.moveTo(x, y);
  ctx.lineTo(x + length, y);
  ctx.lineTo(x + length, y - reservoirLevel);
  ctx.lineTo(x - length / 4, y - reservoirLevel);
  ctx.stroke();
  ctx.closePath();
};
