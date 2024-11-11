import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "styles/themes";
import { HydraulicContextProvider } from "context";

interface RenderWithWrappersOptions extends RenderOptions {
  theme?: "lightTheme" | "darkTheme";
}

export const renderWithWrappers = (
  children: ReactElement,
  { theme = "lightTheme", ...options }: RenderWithWrappersOptions = {},
) => {
  const mockInitialState = {
    pressures: {
      green: 3000,
      blue: 3000,
      yellow: 3000,
    },
    pumps: {
      engine1: false,
      engine2: false,
      blueElectricPump: false,
      powerTransferUnit: false,
      ramAirTurbine: false,
      yellowElectricPump: false,
    },
    valves: {
      engine1: true,
      engine2: true,
    },
  };

  return render(
    <ThemeProvider theme={theme === "darkTheme" ? lightTheme : darkTheme}>
      <HydraulicContextProvider initialState={mockInitialState}>
        {children}
      </HydraulicContextProvider>
    </ThemeProvider>,
    options,
  );
};
