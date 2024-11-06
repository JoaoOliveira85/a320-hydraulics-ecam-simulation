import { SimulationControls } from "components/SimulationControls/SimulationControls";
import { Ecam } from "components";
import { Box, Container, Paper } from "@mui/material";
import { HydraulicProvider } from "context";

export const LayoutConstructor = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: 900,
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        background: "none",
      }}
    >
      <HydraulicProvider>
        <Paper
          square
          className="left-container"
          sx={{
            flex: 2,
            width: { xs: "100%", md: "auto" },
            height: { xs: "auto", md: "100%" },
            minWidth: { xs: "100%", md: 400 },
            minHeight: { xs: 350, sm: 500 },
            overflow: "hidden",
            marginBottom: { xs: 2, md: 0 },
          }}
        >
          <Ecam />
        </Paper>

        <Paper
          elevation={1}
          square
          className="right-container"
          sx={{
            flex: 1,
            width: { xs: "100%", md: "auto" },
            height: { xs: "auto", md: "100%" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            className="right-container__content"
            sx={{
              padding: { xs: 1, md: 2 },
              overflow: "hidden",
            }}
          >
            <SimulationControls />
          </Box>
        </Paper>
      </HydraulicProvider>
    </Container>
  );
};
