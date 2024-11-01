import { render } from "@testing-library/react";
import { test, expect } from "vitest";
import { LayoutConstructor } from "../LayoutConstructor";

test("Renders layout component", () => {
  const { asFragment } = render(<LayoutConstructor />);
  expect(asFragment()).toMatchSnapshot();
});
