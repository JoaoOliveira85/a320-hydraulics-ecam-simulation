import { render } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { App } from "../App";

test("Renders layout component", () => {
  global.Worker = class {
    postMessage = vi.fn();
    terminate = vi.fn();
    onmessage = null;
  } as unknown as typeof Worker;
  vi.mock("styles/colors.module.scss", () => ({
    default: {
      airbusDarkBlue: "#005587",
      airbusWhite: "#ffffff",
    },
  }));
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
  vi.clearAllMocks();
});
