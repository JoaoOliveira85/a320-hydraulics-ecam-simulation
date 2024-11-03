import { render } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { LayoutConstructor } from "../LayoutConstructor";

test("Renders layout component", () => {
  global.Worker = class {
    postMessage = vi.fn();
    terminate = vi.fn();
    onmessage = null;
  } as unknown as typeof Worker;

  const { asFragment } = render(<LayoutConstructor />);
  expect(asFragment()).toMatchSnapshot();
  vi.clearAllMocks();
});
