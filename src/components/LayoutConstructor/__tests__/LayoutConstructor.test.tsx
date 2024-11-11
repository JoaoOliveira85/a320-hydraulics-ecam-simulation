import { test, expect, vi } from "vitest";
import { LayoutConstructor } from "../LayoutConstructor";
import { renderWithWrappers } from "utils/testUtils";

describe("GIVEN the component is rendered", () => {
  test("THEN it gets rendered as expected", () => {
    const { asFragment } = renderWithWrappers(<LayoutConstructor />);
    expect(asFragment()).toMatchSnapshot();
    vi.clearAllMocks();

    expect(asFragment()).toMatchSnapshot();
  });
});
