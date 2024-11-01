import { render } from "@testing-library/react";
import { test, expect } from "vitest";
import { App } from "../App";

test("Renders layout component", () => {
  const { asFragment } = render(<App />);
  expect(asFragment).toMatchSnapshot();
});
