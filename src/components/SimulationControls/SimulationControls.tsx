import "./SimulationControls.scss";
import {
  Container,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import HydraulicWorker from "workers/hydraulicsWorker.js?worker";
import { OverheadPanel } from "./subComponents/OverheadPanel/OverheadPanel";
import EN from "constants/EN.json";
import { TypesOfPumps, TypesOfValves } from "types";

export const SimulationControls = () => {
  const [pressures, setPressures] = useState({ green: 0, blue: 0, yellow: 0 });
  const workerRef = useRef<Worker | null>(null);
  const pumpsRef = useRef({
    engine1: false,
    engine2: false,
    powerTransferUnit: true,
    ramAirTurbine: false,
    blueElectricPump: true,
    yellowElectricPump: false,
  });
  const valvesRef = useRef({ engine1: true, engine2: true });
  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hydraulicWorker = new HydraulicWorker();
      workerRef.current = hydraulicWorker;

      hydraulicWorker.onmessage = (event) => {
        const newPressures = event.data.pressures;
        setPressures((prevPressures) => {
          if (
            newPressures.green !== prevPressures.green ||
            newPressures.blue !== prevPressures.blue ||
            newPressures.yellow !== prevPressures.yellow
          ) {
            return newPressures;
          }
          return prevPressures;
        });
      };

      return () => {
        hydraulicWorker.terminate();
      };
    }
  }, []);

  const setPumpState = (pump: TypesOfPumps, state: boolean) => {
    if (workerRef.current) {
      workerRef.current.postMessage({ type: "SET_PUMP_STATE", pump, state });
    }
  };

  const setValveState = (valve: TypesOfValves, state: boolean) => {
    if (workerRef.current) {
      workerRef.current.postMessage({ type: "SET_VALVE_STATE", valve, state });
    }
  };

  const handlePumpButton = useCallback((button: TypesOfPumps) => {
    const currentState = pumpsRef.current[button];
    const newState = !currentState;
    pumpsRef.current[button] = newState;
    setPumpState(button, newState);
  }, []);

  const handleValveButton = useCallback((button: TypesOfValves) => {
    const currentState = valvesRef.current[button];
    const newState = !currentState;
    valvesRef.current[button] = newState;
    setValveState(button, newState);
  }, []);

  const handleAccordionChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const SECTION_LIST = useMemo(
    () => [
      {
        key: "overhead_panel",
        summary: EN.overhead_panel.title,
        details: (
          <OverheadPanel
            handlePumpButton={handlePumpButton}
            handleValveButton={handleValveButton}
          />
        ),
      },
      {
        key: "simulation_controls",
        summary: EN.simulation_controls.title,
        details: <div>foo</div>,
      },
      {
        key: "real_time_data",
        summary: EN.real_time_data.title,
        details: <div>bar</div>,
      },
      { key: "failures", summary: EN.failures.title, details: <div>baz</div> },
    ],
    [handlePumpButton, handleValveButton],
  );

  useEffect(() => {
    console.log(pressures);
  }, [pressures]);

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
        {SECTION_LIST.map((section) => (
          <Accordion
            key={section.key}
            expanded={expanded === section.key}
            onChange={handleAccordionChange(section.key)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {section.summary}
            </AccordionSummary>
            <AccordionDetails>{section.details}</AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Container>
  );
};
