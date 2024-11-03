import { Box, Typography, Grid2 as Grid, Button } from "@mui/material";
import {
  ButtonElement,
  Pumps,
  ValveElement,
  Valves,
  TypesOfValves,
  TypesOfPumps,
} from "types";
import EN from "constants/EN.json";
const {
  overhead_panel: {
    instruments: { hydraulic_pumps, valves },
  },
} = EN;

export const buttonList: Array<ButtonElement> = [
  {
    id: "eng1-pump",
    label: hydraulic_pumps["eng1-pump"],
    operation: Pumps.engine1,
  },
  {
    id: "elec-pump",
    label: hydraulic_pumps["elec-pump"],
    operation: Pumps.blueElectricPump,
  },
  {
    id: "eng2-pump",
    label: hydraulic_pumps["eng2-pump"],
    operation: Pumps.engine2,
  },
  {
    id: "rat-man-on",
    label: hydraulic_pumps["rat-man-on"],
    operation: Pumps.ramAirTurbine,
  },
  {
    id: "ptu-auto",
    label: hydraulic_pumps["ptu-auto"],
    operation: Pumps.powerTransferUnit,
  },
  {
    id: "elec-pump-2",
    label: hydraulic_pumps["elec-pump-2"],
    operation: Pumps.yellowElectricPump,
  },
];

export const ValveList: Array<ValveElement> = [
  { id: "eng1-valve", label: valves["eng1-valve"], operation: Valves.engine1 },
  { id: "eng2-valve", label: valves["eng2-valve"], operation: Valves.engine2 },
];

export interface OverheadPanelProps {
  handlePumpButton: (button: TypesOfPumps) => void;
  handleValveButton: (button: TypesOfValves) => void;
}

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
