import { ThemeOptions } from "./general";
import { TypesOfPtus, TypesOfPumps } from "./overheadPanelTypes";

export type ImageGroup = TypesOfPumps | TypesOfPtus | "overheadPanel";

export type ImageCollection = {
  [key in ThemeOptions]: Partial<Record<ImageGroup, string>>;
};
