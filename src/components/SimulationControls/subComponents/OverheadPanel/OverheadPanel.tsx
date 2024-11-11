import { Box, Typography, Button, Grid2 as Grid } from "@mui/material";
import { OverheadPanelProps } from "types";
import EN from "constants/EN.json";
import { buttonList, PtuList, ValveList } from "constants/controls";

const {
  overhead_panel: {
    instruments: { hydraulic_pumps, valves, ptus },
  },
} = EN;

export const OverheadPanel: React.FC<OverheadPanelProps> = ({
  handlePumpButton,
  handleValveButton,
  handlePtuButton,
}) => {
  return (
    <>
      <Box sx={{ position: "relative", width: "100%", padding: 0 }}>
        <Typography variant="h6" align="center">
          {hydraulic_pumps.sub_title}
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {buttonList.map((button) => (
            <Grid
              key={button.id}
              sx={{
                gridColumn: {
                  xs: "span 2",
                  md: "span 4",
                },
              }}
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                id={button.id}
                onClick={() => handlePumpButton(button.operation)}
              >
                {button.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ position: "relative", width: "100%", padding: 0 }}>
        <Typography variant="h6" align="center">
          {valves.sub_title}
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {ValveList.map((button) => (
            <Grid
              key={button.id}
              sx={{
                gridColumn: {
                  xs: "span 6",
                  md: "span 4",
                },
              }}
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                id={button.id}
                onClick={() => handleValveButton(button.operation)}
              >
                {button.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ position: "relative", width: "100%", padding: 0 }}>
        <Typography variant="h6" align="center">
          {ptus.sub_title}
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {PtuList.map((button) => (
            <Grid
              key={button.id}
              sx={{
                gridColumn: {
                  xs: "span 6",
                  md: "span 4",
                },
              }}
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                id={button.id}
                onClick={() => handlePtuButton(button.operation)}
              >
                {button.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
