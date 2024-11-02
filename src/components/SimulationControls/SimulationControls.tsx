import "./SimulationControls.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid2 as Grid,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EN from "constants/EN.json";

const { overhead_panel } = EN;

export const SimulationControls = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
    >
      <Paper>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {overhead_panel.title}
          </AccordionSummary>
          <AccordionDetails
            sx={{
              maxHeight: { xs: "200px", sm: "300px", md: "none" }, // Limit height on mobile
              overflowY: "auto", // Enable scrolling if content overflows
            }}
          >
            <Box sx={{ position: "relative", width: "100%", padding: 0 }}>
              <Grid
                container
                spacing={2}
                columns={12}
                justifyContent="center"
                alignItems="center"
              >
                {[
                  { id: "eng1-pump", label: "ENG 1 PUMP" },
                  { id: "elec-pump", label: "ELEC PUMP" },
                  { id: "eng2-pump", label: "ENG 2 PUMP" },
                  { id: "rat-man-on", label: "RAT MAN ON" },
                  { id: "ptu-auto", label: "PTU (auto)" },
                  { id: "elec-pump-2", label: "ELEC PUMP" },
                ].map((button) => (
                  <Grid
                    key={button.id}
                    sx={{
                      width: { xs: "100%", sm: "50%", md: "33.33%" },
                    }}
                  >
                    <Button variant="contained" color="primary" id={button.id}>
                      {button.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>
        {["Simulation Controls", "Real Time Data", "Failures"].map(
          (label, index) => (
            <Accordion key={index} disabled>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {label}
              </AccordionSummary>
            </Accordion>
          ),
        )}
      </Paper>
    </Container>
  );
};
