import { ChangeEvent, useState } from "react";
import { Box, Button, TextField, Typography, Grid, Paper } from "@mui/material";
import { SimulationSettings, Color, TypesOfPumps } from "types";
import defaultSettings from "workers/simulationDefaultSettings.json";

type SimulationSettingsComponentProps = {
  onApplySettings: (setting: SimulationSettings) => void;
  onResetSettings: () => void;
};

export default function SimulationSettingsComponent({
  onApplySettings,
  onResetSettings,
}: Readonly<SimulationSettingsComponentProps>) {
  const [settings, setSettings] = useState(defaultSettings);

  const handleChange =
    <K extends keyof SimulationSettings, S extends keyof SimulationSettings[K]>(
      category: K,
      key: S,
    ) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = +event.target.value;
      setSettings((prevSettings) => ({
        ...prevSettings,
        [category]: { ...prevSettings[category], [key]: value },
      }));
    };

  const applySettings = () => onApplySettings(settings);
  const resetSettings = () => {
    setSettings(defaultSettings);
    onResetSettings();
  };

  type SettingsConfig = {
    title: string;
    category: keyof SimulationSettings;
    fields: Partial<
      | Color
      | TypesOfPumps
      | { key: keyof SimulationSettings["other"]; label: string }
    >[];
    unit: string;
  };

  const settingsConfig: SettingsConfig[] = [
    {
      title: "Reservoir Starting Levels",
      category: "reservoireStartingLevels",
      fields: ["green", "yellow", "blue"],
      unit: "ml",
    },
    {
      title: "Reservoir Leakage Rates",
      category: "reservoireLeakageRates",
      fields: ["green", "yellow", "blue"],
      unit: "ml/s",
    },
    {
      title: "Pump Max Flow Rates",
      category: "pumpMaxFlowRates",
      fields: [
        "engine1",
        "engine2",
        "blueElectricPump",
        "yellowElectricPump",
        "ramAirTurbine",
      ],
      unit: "PSI",
    },
    {
      title: "Other Settings",
      category: "other",
      fields: [
        { key: "hydraulicLineMaxPressure", label: "Line Max Pressure" },
        { key: "ptuThreshold", label: "PTU Threshold" },
        { key: "airTemperature", label: "Air Temperature (°C)" },
        { key: "speed", label: "Speed" },
      ],
      unit: "",
    },
  ];

  return (
    <Paper>
      <Box component="form">
        {settingsConfig.map((section) => (
          <Box key={section.category} sx={{ mt: 3 }}>
            <Typography variant="h6">{section.title}</Typography>
            <Grid container spacing={2}>
              {section.fields.map((field) => {
                const fieldKey = typeof field === "string" ? field : field.key;
                const label = typeof field === "string" ? field : field.label;
                return (
                  <Grid item key={fieldKey} xs={6}>
                    <TextField
                      label={`${label} ${section.unit || ""}`}
                      type="number"
                      value={
                        settings[section.category][
                          fieldKey as unknown as keyof SimulationSettings[typeof section.category]
                        ]
                      }
                      onChange={handleChange(
                        section.category,
                        fieldKey as unknown as keyof SimulationSettings[typeof section.category],
                      )}
                      fullWidth
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ))}

        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={applySettings}>
            Apply
          </Button>
          <Button variant="outlined" color="secondary" onClick={resetSettings}>
            Reset
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
