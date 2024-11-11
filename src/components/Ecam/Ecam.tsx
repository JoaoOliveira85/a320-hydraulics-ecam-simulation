import imageDay from "assets/ecam_and_panel_day_hyd_on.webp";
import imageNight from "assets/ecam_and_panel_night_hyd_on.webp";
import "./Ecam.scss";

import { EcamDisplay } from "components";
import { useMediaQuery } from "@mui/material";
import { useHydraulicContext } from "hooks";

import EN from "constants/EN.json";
import { useContext } from "react";
import { HydraulicContext } from "context";

export const Ecam = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const context = useContext(HydraulicContext);

  const { reservoires, pressures, pumps, valves, ptus, other } =
    useHydraulicContext(context);

  return (
    <div className="container__ecam">
      <img
        src={prefersDarkMode ? imageNight : imageDay}
        alt={EN.cockpit_simulation.ecamAlt}
        className="container__ecam__image"
      />
      <EcamDisplay
        reservoires={reservoires}
        pressures={pressures}
        pumps={pumps}
        valves={valves}
        ptus={ptus}
        other={other}
      />
    </div>
  );
};
