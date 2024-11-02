import { SimulationControls } from "components/SimulationControls/SimulationControls";
import "./LayoutConstructor.scss";
import { Ecam } from "components";
import { Box, Container, Paper } from "@mui/material";

export const LayoutConstructor = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        background: "none",
      }}
    >
      <Paper
        square
        className="left-container"
        sx={{
          flex: 2,
          width: { xs: "100%", md: "auto" },
          height: { xs: "50vh", md: "100%" },
          minWidth: 500,
          overflow: "hidden",
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
          height: "100%",

          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box className="right-container__content">
          <SimulationControls />
        </Box>

        <Box className="right-container__header">
          <Paper sx={{ padding: 2 }}>
            <h1>TASK #1: Frontend Development</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
              tortor nec urna maximus auctor nec at mi. Mauris vitae leo lorem.
              Ut convallis metus vitae dolor pellentesque, a mattis dolor
              egestas. Suspendisse dignissim felis a iaculis pulvinar. Donec ut
              sem quis eros feugiat blandit. Nulla ullamcorper turpis eu sapien
              sodales lobortis. Phasellus quis eros vitae lacus convallis
              consequat ac id massa. Sed at egestas ligula. Praesent maximus
              nulla vitae leo tempor, nec tempus magna hendrerit. Fusce bibendum
              semper condimentum. Nulla facilisi. Nulla bibendum sed dolor eu
              dignissim. Nunc sollicitudin egestas nulla nec faucibus. Cras
              fermentum enim ac metus auctor, ut tristique libero blandit.
            </p>
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
};
