import { test, expect, describe } from "vitest";
import { Ecam } from "../Ecam";
import { renderWithWrappers } from "utils/testUtils";

describe("GIVEN the component is rendered", () => {
  test("THEN it gets rendered as expected", () => {
    const { asFragment } = renderWithWrappers(<Ecam />);
    expect(asFragment()).toMatchSnapshot();
  });
});
