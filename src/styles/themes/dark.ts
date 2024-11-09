import { createTheme } from "@mui/material/styles";
import colors from "../colors.module.scss";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.airbusLightBlue,
      light: colors.airbusSilver,
      dark: colors.airbusMediumBlue,
      contrastText: colors.black,
    },
    secondary: {
      main: colors.greenLight,
      light: colors.green,
      dark: colors.greenDark,
      contrastText: colors.black,
    },
    background: {
      default: colors.airbusBlue,
      paper: colors.darkGray,
    },
    text: {
      primary: colors.airbusSilver,
      secondary: colors.lightGray,
    },
    error: {
      main: colors.redLight,
      dark: colors.redDark,
      light: colors.redLight,
      contrastText: colors.white,
    },
    warning: {
      main: colors.yellowLight,
      dark: colors.yellowDark,
      light: colors.yellowLight,
      contrastText: colors.black,
    },
    success: {
      main: colors.greenLight,
      dark: colors.greenDark,
      light: colors.greenLight,
      contrastText: colors.black,
    },
    info: {
      main: colors.cyanLight,
      dark: colors.cyanDark,
      light: colors.cyanLight,
      contrastText: colors.black,
    },
    divider: colors.mediumGray,
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
            backgroundColor: colors.darkGray,
            borderColor: colors.airbusMediumBlue,
            color: colors.airbusSilver,
          },
        },
      },
    },
  },
});
