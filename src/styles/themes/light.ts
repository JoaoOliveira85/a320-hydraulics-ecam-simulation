import { createTheme } from "@mui/material";
import colors from "../colors.module.scss";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.airbusMediumBlue,
      light: colors.airbusDarkBlue,
      dark: colors.airbusSilver,
    },
    secondary: {
      main: colors.green,
      light: colors.greenLight,
      dark: colors.greenDark,
    },
    background: {
      default: colors.airbusLightBlue,
      paper: colors.white,
    },
    text: {
      primary: colors.airbusDarkBlue,
      secondary: colors.mediumGray,
    },
    error: {
      main: colors.red,
      dark: colors.redDark,
      light: colors.redLight,
    },
    warning: {
      main: colors.yellow,
      dark: colors.yellowDark,
      light: colors.yellowLight,
    },
    success: {
      main: colors.green,
      dark: colors.greenDark,
      light: colors.greenLight,
    },
    info: {
      main: colors.cyan,
      dark: colors.cyanDark,
      light: colors.cyanLight,
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
          backgroundColor: colors.airbusMediumBlue,
          color: colors.white,
          "&:hover": {
            backgroundColor: colors.airbusDarkBlue,
          },
        },
        outlinedPrimary: {
          borderColor: colors.airbusMediumBlue,
          color: colors.airbusMediumBlue,
          "&:hover": {
            backgroundColor: colors.airbusLightBlue,
            borderColor: colors.airbusDarkBlue,
            color: colors.airbusDarkBlue,
          },
        },
      },
    },
  },
});
