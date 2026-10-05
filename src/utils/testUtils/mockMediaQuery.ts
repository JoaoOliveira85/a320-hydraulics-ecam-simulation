import { vi, type Mock } from "vitest";
import * as mui from "@mui/material";

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  };
});

export const mockedUseMediaQuery = mui.useMediaQuery as unknown as Mock;
