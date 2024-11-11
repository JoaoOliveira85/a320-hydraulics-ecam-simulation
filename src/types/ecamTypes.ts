export type Position = { x: number; y: number };

export type PermanentDataProps = {
  ctx: CanvasRenderingContext2D;
  tat: number;
  sat: number;
  time: Date;
  gw: number;
};

export enum EcamColors {
  green = "green",
  white = "white",
  orange = "orange",
  black = "black",
}

export type EcamColorsType = keyof typeof EcamColors;

export type DrawLineProps = {
  ctx: CanvasRenderingContext2D;
  orientation: "horizontal" | "vertical";
  from: Position;
  length: number;
  color: EcamColorsType;
  width?: number;
};

export type DrawShapeProps = {
  ctx: CanvasRenderingContext2D;
  position: Position;
  size: number;
  color: EcamColorsType;
  fill?: boolean;
};

export type DrawPumpProps = {
  ctx: CanvasRenderingContext2D;
  position: Position;
  status: boolean;
  lowPressure: boolean;
  color?: EcamColorsType;
  size?: number;
};

export type DrawValveProps = {
  ctx: CanvasRenderingContext2D;
  position: Position;
  status: boolean;
  size?: number;
};

export type DrawTextProps = {
  ctx: CanvasRenderingContext2D;
  position: Position;
  color: EcamColorsType;
  text: string;
  fontSize?: number;
  font?: string;
};

export type drawResrvoirProps = {
  ctx: CanvasRenderingContext2D;
  position: Position;
  length: number;
  height: number;
  reservoirLevel: number;
};

export type EcamHeaderProps = {
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
