import React, { useContext } from "react";
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
import { useHydraulicContext } from "hooks";
import { Color } from "types";
import { HydraulicContext } from "context";

const sanitize = (str: string) =>
  str
    .replace(/ /g, "_")
    .replace(/[()°-]/g, "")
    .toLowerCase();

export const RealTimeData: React.FC = () => {
  const context = useContext(HydraulicContext);

  const { reservoires, pressures, pumps, valves, other } =
    useHydraulicContext(context);
  const pumpStatuses = Object.entries(pumps).map(([pump, isActive]) => ({
    name: pump,
    status: isActive ? "Active" : "Inactive",
  }));

  const valveStatuses = Object.entries(valves).map(([valve, isOpen]) => ({
    name: valve,
    status: isOpen ? "Open" : "Closed",
  }));

  const tableDataColor = [
    {
      parameter: "Reservoir Levels (%)",
      values: {
        green: reservoires.green.toFixed(2),
        yellow: reservoires.yellow.toFixed(2),
        blue: reservoires.blue.toFixed(2),
      },
    },
    {
      parameter: "Pressure (PSI)",
      values: {
        green: pressures.green,
        yellow: pressures.yellow,
        blue: pressures.blue,
      },
    },
  ];

  const tableDataEngine = [
    {
      parameter: "Pump Status",
      statuses: pumpStatuses,
    },
    {
      parameter: "Valve Status",
      statuses: valveStatuses,
    },
  ];

  const tableDataOther = [
    {
      parameter: "Air Temperature (°C)",
      value: other.airTemperature,
    },
    {
      parameter: "PTU Threshold",
      value: other.ptuThreshold,
    },
    {
      parameter: "System Speed",
      value: other.speed,
    },
    {
      parameter: "Gross Weight",
      value: other.grossWeight,
    },
  ];

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 800, margin: "auto", my: 4, padding: 2 }}
    >
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        Simulation Data
      </Typography>

      <Table size="small" aria-label="color-based simulation data table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Parameter</TableCell>
            <TableCell align="center">Green</TableCell>
            <TableCell align="center">Yellow</TableCell>
            <TableCell align="center">Blue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableDataColor.map((row) => (
            <TableRow key={row.parameter}>
              <TableCell component="th" scope="row" align="center">
                {row.parameter}
              </TableCell>
              {(["green", "yellow", "blue"] as Color[]).map((color) => (
                <TableCell
                  key={color}
                  align="center"
                  data-testid={`realTimeData-${sanitize(
                    row.parameter,
                  )}-${color}`}
                >
                  {row.values[color]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <br />

      <Table size="small" aria-label="engine-based simulation data table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Parameter</TableCell>
            {pumpStatuses.map((pump) => (
              <TableCell
                key={pump.name}
                align="center"
                data-testid={`realTimeData-${sanitize(pump.name)}-header`}
              >
                {pump.name.replace(/-/g, " ")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableDataEngine.map((row) => (
            <TableRow key={row.parameter}>
              <TableCell component="th" scope="row" align="center">
                {row.parameter}
              </TableCell>
              {row.statuses.map((status) => (
                <TableCell
                  key={status.name}
                  align="center"
                  data-testid={`realTimeData-${sanitize(
                    row.parameter,
                  )}-${sanitize(status.name)}`}
                >
                  {status.status}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <br />

      <Table size="small" aria-label="other-settings simulation data table">
        <TableBody>
          {tableDataOther.map((row) => (
            <TableRow key={row.parameter}>
              <TableCell component="th" scope="row" align="center">
                {row.parameter}
              </TableCell>
              <TableCell
                align="center"
                colSpan={3}
                data-testid={`realTimeData-${sanitize(row.parameter)}`}
              >
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
