import { LayoutConstructor } from "components";
import {
  ThemeProvider,
  createTheme,
  Box,
  GlobalStyles,
  useMediaQuery,
} from "@mui/material";
import colors from "styles/colors.module.scss";

console.log(colors.airbusDarkBlue);
export const App = () => {
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: { main: colors.airbusDarkBlue },
      background: { default: colors.airbusWhite },
      text: { primary: "#000000" },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#90caf9" },
      background: { default: "#121212", paper: "#1d1d1d" },
      text: { primary: "#ffffff" },
    },
  });

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const currentTheme = prefersDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles
        styles={{
          body: { backgroundColor: currentTheme.palette.background.default },
        }}
      />
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "background.default",
        }}
      >
        <LayoutConstructor />
      </Box>
    </ThemeProvider>
  );
};
