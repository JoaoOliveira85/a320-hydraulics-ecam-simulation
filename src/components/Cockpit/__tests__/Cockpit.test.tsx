import { mockHydraulicContext } from "utils/testUtils";
import { renderWithWrappers } from "utils/testUtils/renderWithWrappers";
import { Cockpit } from "../Cockpit";
import { vi, describe, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom";

describe("CockpitComponent Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockHydraulicContext();
  });

  describe("GIVEN the component is rendered", () => {
    test("THEN it gets rendered as expected", () => {
      const { asFragment } = renderWithWrappers(<Cockpit />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
