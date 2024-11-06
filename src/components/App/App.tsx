import { LayoutConstructor } from "components";
import { ThemeProvider, Box, GlobalStyles, useMediaQuery } from "@mui/material";
import "./App.scss";
import { darkTheme, lightTheme } from "styles/themes";

export const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const currentTheme = prefersDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: currentTheme.palette.background.default,
            color: currentTheme.palette.text.primary,
            fontFamily: currentTheme.typography.fontFamily,
          },
        }}
      />
      <Box
        sx={{
          height: { xs: "auto", md: "100vh" },
          minHeight: { xs: "100vh", md: "100vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          overflowY: "auto", // Enables scrolling on smaller screens
        }}
      >
        <LayoutConstructor />
      </Box>
    </ThemeProvider>
  );
};
