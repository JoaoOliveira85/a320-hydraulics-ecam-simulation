import {
  Container,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  useMediaQuery,
  Tabs,
  Tab,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMemo, useState } from "react";
import { OverheadPanel } from "./subComponents/OverheadPanel/OverheadPanel";
import EN from "constants/EN.json";
import { useHydraulicContext } from "context";
import logoWhite from "assets/logos/logo_white.png";
import logoBlue from "assets/logos/logo_blue.png";

export const SimulationControls = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const isMediumOrBelow = useMediaQuery("(max-width:900px)");
  const isTabletOrBelow = useMediaQuery("(max-width:1280px)");
  const isDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const {
    controls: { handlePumpButton, handleValveButton },
  } = useHydraulicContext();

  const handleAccordionChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
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
        disabled: true,
        details: <div>foo</div>,
      },
      {
        key: "real_time_data",
        summary: EN.real_time_data.title,
        disabled: true,
        details: <div>bar</div>,
      },
      {
        key: "failures",
        summary: EN.failures.title,
        disabled: true,
        details: <div>baz</div>,
      },
    ],
    [handlePumpButton, handleValveButton],
  );

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: 1, md: 2 },
        width: { xs: "100%", md: "90%", lg: "auto" },
        maxWidth: isTabletOrBelow ? "100%" : "450px",
        height: "100%",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          padding: { xs: 1, md: 2 },
          boxShadow: { xs: 2, md: 4 },
          maxHeight: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: { xs: 0, md: 2 },
            marginBottom: { xs: 0, md: 3 },
          }}
        >
          <img
            src={isDarkTheme ? logoWhite : logoBlue}
            alt="logo"
            style={{
              width: "80px",
              height: "auto",
            }}
          />
        </Box>

        {isMediumOrBelow ? (
          <>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                marginBottom: 2,
                minHeight: "48px",
                "& .MuiTab-root": {
                  minWidth: "auto",
                  fontSize: { xs: "0.75rem", sm: "0.9rem" },
                  padding: { xs: 0.5, sm: 1 },
                },
              }}
            >
              <Tab label="Introduction" />
              {SECTION_LIST.map((section) => (
                <Tab
                  key={section.key}
                  label={section.summary}
                  disabled={section.disabled}
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.9rem" },
                  }}
                />
              ))}
            </Tabs>
            <Box sx={{ padding: { xs: 1, md: 2 } }}>
              {selectedTab === 0 ? (
                <Box sx={{ padding: { xs: 1, md: 2 } }}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
                  >
                    TASK #1: Frontend Development
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: "0.8rem", md: "1rem" },
                      overflowY: "auto",
                      maxHeight: "100%",
                    }}
                  >
                    This is a work in progress of the frontend development task.
                    Currently, a responsive application is in place that
                    simulates a rudimentary hydraulic system with three separate
                    lines, each with its set of pumps and/or valves and
                    redundancy systems.
                    <br />
                    The current implementation is fully functioning as an MVP,
                    so for now, the development focus will shift to integrate
                    the ECAM screen on the actual simulator before completing
                    further functionalities in this demonstration.
                  </Typography>
                </Box>
              ) : (
                SECTION_LIST[selectedTab - 1]?.details
              )}
            </Box>
          </>
        ) : (
          <>
            {SECTION_LIST.map((section) => (
              <Accordion
                key={section.key}
                expanded={expanded === section.key}
                onChange={handleAccordionChange(section.key)}
                sx={{
                  "& .MuiAccordionSummary-content": {
                    flexDirection: { xs: "column", md: "row" },
                  },
                  marginBottom: { xs: 1, md: 2 },
                }}
              >
                <AccordionSummary
                  disabled={section.disabled}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                  >
                    {section.summary}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: { xs: 1, md: 2 },
                    maxHeight: { xs: "200px", md: "300px" },
                    overflowY: "auto",
                  }}
                >
                  {section.details}
                </AccordionDetails>
              </Accordion>
            ))}
            <Box
              className="right-container__header"
              sx={{
                marginTop: "auto",
                maxHeight: { xs: "150px", md: "none" },
                overflowY: "auto",
                padding: { xs: 1, md: 2 },
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
              >
                TASK #1: Frontend Development
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  overflowY: "auto",
                  maxHeight: "100%",
                }}
              >
                This is a work in progress of the frontend development task.
                Currently, a responsive application is in place that simulates a
                rudimentary hydraulic system with three separate lines, each
                with its set of pumps and/or valves and redundancy systems.
                <br />
                The current implementation is fully functioning as an MVP, so
                for now, the development focus will shift to integrate the ECAM
                screen on the actual simulator before completing further
                functionalities in this demonstration.
              </Typography>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};
