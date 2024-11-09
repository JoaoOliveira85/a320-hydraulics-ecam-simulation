import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useHydraulicContext } from "context";

export const RealTimeData: React.FC = () => {
  const { reservoires, pressures, pumps, valves, other } =
    useHydraulicContext();

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 600, margin: "auto", my: 4 }}
    >
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        Simulation Data
      </Typography>
      <Table size="small" aria-label="simulation data table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Parameter</TableCell>
            <TableCell align="center">Green</TableCell>
            <TableCell align="center">Yellow</TableCell>
            <TableCell align="center">Blue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row" align="center">
              Reservoir Levels (%)
            </TableCell>
            <TableCell align="center">{reservoires.green.toFixed(2)}</TableCell>
            <TableCell align="center">
              {reservoires.yellow.toFixed(2)}
            </TableCell>
            <TableCell align="center">{reservoires.blue.toFixed(2)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row" align="center">
              Pressure (PSI)
            </TableCell>
            <TableCell align="center">{pressures.green}</TableCell>
            <TableCell align="center">{pressures.yellow}</TableCell>
            <TableCell align="center">{pressures.blue}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row" align="center">
              Pump Status
            </TableCell>
            <TableCell align="center">
              {pumps.engine1 ? "Active" : "Inactive"}
            </TableCell>
            <TableCell align="center">
              {pumps.engine2 ? "Active" : "Inactive"}
            </TableCell>
            <TableCell align="center">
              {pumps.blueElectricPump ? "Active" : "Inactive"}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell component="th" scope="row" align="center">
              Valve Status
            </TableCell>
            <TableCell align="center">
              {valves.engine1 ? "Open" : "Closed"}
            </TableCell>
            <TableCell align="center">
              {valves.engine2 ? "Open" : "Closed"}
            </TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <br />
      <Table size="small" aria-label="simulation data table">
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row" align="center">
              Air Temperature (°C)
            </TableCell>
            <TableCell align="center" colSpan={3}>
              {other.airTemperature}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" align="center">
              PTU Threshold
            </TableCell>
            <TableCell align="center" colSpan={3}>
              {other.ptuThreshold}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" align="center">
              System Speed
            </TableCell>
            <TableCell align="center" colSpan={3}>
              {other.speed}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" align="center">
              Gross Weight
            </TableCell>
            <TableCell align="center" colSpan={3}>
              {other.grossWeight}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
