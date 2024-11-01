import { render } from "@testing-library/react";
import { test, expect } from "vitest";
import { Ecam } from "../Ecam";

test("Renders layout component", () => {
  const { asFragment } = render(<Ecam />);
  expect(asFragment()).toMatchSnapshot();
});
