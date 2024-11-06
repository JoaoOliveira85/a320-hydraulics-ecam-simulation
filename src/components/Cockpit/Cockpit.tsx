import "./Cockpit.scss";
import { CockpitComponent, OverheadComponent } from "components";
import { Box, Container } from "@mui/material";
import { HydraulicProvider } from "context";

export const Cockpit = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: "100vh",
        width: "100%",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <HydraulicProvider>
        <Box
          sx={{
            width: "auto",
            height: "20vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            backgroundColor: "black",
          }}
        >
          <OverheadComponent />
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            backgroundColor: "black",
            objectFit: "contain",
          }}
        >
          <CockpitComponent />
        </Box>
      </HydraulicProvider>
    </Container>
  );
};
