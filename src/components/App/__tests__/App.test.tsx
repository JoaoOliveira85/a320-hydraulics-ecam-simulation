import { render } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { App } from "../App";

test("Renders layout component", () => {
  vi.mock("styles/colors.module.scss", () => ({
    default: {
      airbusDarkBlue: "#005587",
      airbusWhite: "#ffffff",
    },
  }));
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
