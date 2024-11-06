// Based on the Airbus branding guidelines https://brand.airbus.com/en/asset-library/colours

import { createTheme } from "@mui/material";
import colors from "../colors.module.scss";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.airbusLightBlue,
      light: colors.airbusSilver,
      dark: colors.airbusMediumBlue,
    },
    secondary: {
      main: colors.greenLight,
      light: colors.green,
      dark: colors.greenDark,
    },
    background: {
      default: colors.black,
      paper: colors.airbusBlue,
    },
    text: {
      primary: colors.airbusSilver,
      secondary: colors.lightGray,
    },
    error: {
      main: colors.redLight,
      dark: colors.red,
      light: colors.redDark,
    },
    warning: {
      main: colors.yellowLight,
      dark: colors.yellow,
      light: colors.yellowDark,
    },
    success: {
      main: colors.greenLight,
      dark: colors.green,
      light: colors.greenDark,
    },
    info: {
      main: colors.cyanLight,
      dark: colors.cyan,
      light: colors.cyanDark,
    },
  },
  typography: {
    fontFamily: "'Helvetica', Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 16px",
          minWidth: "120px",
          minHeight: "40px",
          fontSize: "0.875rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        sizeSmall: {
          minWidth: "100px",
          minHeight: "36px",
          fontSize: "0.8rem",
        },
        sizeMedium: {
          minWidth: "120px",
          minHeight: "40px",
          fontSize: "0.875rem",
        },
        sizeLarge: {
          minWidth: "140px",
          minHeight: "48px",
          fontSize: "1rem",
        },
        containedPrimary: {
          backgroundColor: colors.airbusLightBlue,
          color: colors.black,
          "&:hover": {
            backgroundColor: colors.airbusMediumBlue,
          },
        },
        outlinedPrimary: {
          borderColor: colors.airbusLightBlue,
          color: colors.airbusLightBlue,
          "&:hover": {
            backgroundColor: colors.airbusDarkBlue,
            borderColor: colors.airbusMediumBlue,
            color: colors.airbusSilver,
          },
        },
      },
    },
  },
});
