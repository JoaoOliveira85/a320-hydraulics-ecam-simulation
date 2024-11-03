import { Box, Typography, Grid2 as Grid, Button } from "@mui/material";
import { OverheadPanelProps } from "types";
import EN from "constants/EN.json";
import { buttonList, ValveList } from "constants/controls";
const {
  overhead_panel: {
    instruments: { hydraulic_pumps, valves },
  },
} = EN;

export const OverheadPanel: React.FC<OverheadPanelProps> = ({
  handlePumpButton,
  handleValveButton,
}) => {
  return (
    <>
      <Box sx={{ position: "relative", width: "100%", padding: 0 }}>
        <Typography variant="h6" align="center">
          {hydraulic_pumps.sub_title}
        </Typography>
        <Grid
          container
          spacing={2}
          columns={12}
          justifyContent="center"
          alignItems="center"
        >
          {buttonList.map((button) => (
            <Grid
              key={button.id}
              sx={{
                width: { xs: "100%", sm: "50%", md: "33.33%" },
              }}
            >
              <Button
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
        <Grid
          container
          spacing={2}
          columns={12}
          justifyContent="center"
          alignItems="center"
        >
          {ValveList.map((button) => (
            <Grid
              key={button.id}
              sx={{
                width: { xs: "100%", sm: "50%", md: "33.33%" },
              }}
            >
              <Button
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
    </>
  );
};
