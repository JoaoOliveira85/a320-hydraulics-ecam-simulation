import { screen } from "@testing-library/react";
import { mockedUseMediaQuery, renderWithWrappers } from "utils/testUtils";
import { App } from "../App";
import { darkTheme, lightTheme } from "styles/themes";
import "@testing-library/jest-dom";
import { describe, expect, beforeEach } from "vitest";
import EN from "constants/EN.json";

describe("App Component", () => {
  beforeEach(() => {
    mockedUseMediaQuery.mockReset();
  });

  describe("GIVEN the component is rendered", () => {
    test("THEN it gets rendered as expected", () => {
      const { asFragment } = renderWithWrappers(<App />);

      expect(asFragment()).toMatchSnapshot();
    });

    describe("WHEN the theme is light", () => {
      test("THEN the component is rendered with light theme style", () => {
        mockedUseMediaQuery.mockReturnValue(false);

        renderWithWrappers(<App />);

        expect(document.body).toHaveStyle(
          `background-color: ${lightTheme.palette.background.default}`,
        );

        expect(document.body).toHaveStyle(
          `color: ${lightTheme.palette.text.primary}`,
        );

        expect(
          screen.getByText(EN.simulation_controls.title),
        ).toBeInTheDocument();
      });
    });

    describe("WHEN the theme is dark", () => {
      test("THEN the component is rendered with dark theme style", () => {
        mockedUseMediaQuery.mockReturnValue(true);

        renderWithWrappers(<App />, { theme: "darkTheme" });

        expect(document.body).toHaveStyle(
          `background-color: ${darkTheme.palette.background.default}`,
        );

        expect(document.body).toHaveStyle(
          `color: ${darkTheme.palette.text.primary}`,
        );

        expect(
          screen.getByText(EN.simulation_controls.title),
        ).toBeInTheDocument();
      });
    });
  });
});
