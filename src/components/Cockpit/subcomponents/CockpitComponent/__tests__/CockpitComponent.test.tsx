import { screen } from "@testing-library/react";
import {
  mockedUseMediaQuery,
  mockHydraulicContext,
  renderWithWrappers,
} from "utils/testUtils";
import { CockpitComponent } from "../CockpitComponent";
import { vi, describe, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import EN from "constants/EN.json";

describe("CockpitComponent Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockHydraulicContext();
  });

  describe("GIVEN the component is rendered", () => {
    test("THEN it gets rendered as expected", () => {
      const { asFragment } = renderWithWrappers(<CockpitComponent />);

      expect(asFragment()).toMatchSnapshot();
    });
    describe("WHEN the theme is light", () => {
      test("THEN the component is rendered with light assets", () => {
        mockedUseMediaQuery.mockReturnValue(false);

        renderWithWrappers(<CockpitComponent />);

        const image = screen.getByAltText(EN.cockpit_simulation.ecamAlt);
        expect(image).toBeInTheDocument();
        expect((image as HTMLImageElement).src).toContain(
          "cockpit_day_hyd_on.webp",
        );
      });
    });

    describe("WHEN the theme is dark", () => {
      test("THEN the component is rendered with dark assets", () => {
        mockedUseMediaQuery.mockReturnValue(true);

        renderWithWrappers(<CockpitComponent />, { theme: "darkTheme" });

        const image = screen.getByAltText(EN.cockpit_simulation.ecamAlt);
        expect(image).toBeInTheDocument();
        expect((image as HTMLImageElement).src).toContain(
          "cockpit_night_hyd_on.webp",
        );
      });
    });
  });
});
