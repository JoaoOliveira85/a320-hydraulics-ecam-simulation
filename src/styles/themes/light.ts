import { createTheme } from "@mui/material/styles";
import { colors } from "../colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.airbusMediumBlue,
      light: colors.airbusLightBlue,
      dark: colors.airbusDarkBlue,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.green,
      light: colors.greenLight,
      dark: colors.greenDark,
      contrastText: colors.white,
    },
    background: {
      default: colors.airbusLightBlue,
      paper: colors.extraLightGray,
    },
    text: {
      primary: colors.airbusDarkBlue,
      secondary: colors.mediumGray,
    },
    error: {
      main: colors.red,
      dark: colors.redDark,
      light: colors.redLight,
      contrastText: colors.white,
    },
    warning: {
      main: colors.yellow,
      dark: colors.yellowDark,
      light: colors.yellowLight,
      contrastText: colors.black,
    },
    success: {
      main: colors.green,
      dark: colors.greenDark,
      light: colors.greenLight,
      contrastText: colors.white,
    },
    info: {
      main: colors.cyan,
      dark: colors.cyanDark,
      light: colors.cyanLight,
      contrastText: colors.white,
    },
    divider: colors.lightGray,
  },
  typography: {
    fontFamily: "'Helvetica', Arial, sans-serif",
    h1: {
      fontFamily: "'Helvetica Bold', Arial, sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Helvetica Bold', Arial, sans-serif",
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
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
