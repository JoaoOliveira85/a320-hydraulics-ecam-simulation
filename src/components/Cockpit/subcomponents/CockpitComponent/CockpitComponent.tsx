import imageDay from "assets/cockpit_day_hyd_on.webp";
import imageNight from "assets/cockpit_night_hyd_on.webp";
import "./CockpitComponent.scss";

import { EcamDisplay } from "components";
import { useMediaQuery } from "@mui/material";
import { useHydraulicContext } from "hooks";

import EN from "constants/EN.json";
import { useContext } from "react";
import { HydraulicContext } from "context";

export const CockpitComponent = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const context = useContext(HydraulicContext);
  const { pressures, pumps, valves, ptus, reservoires, other } =
    useHydraulicContext(context);

  return (
    <div className="cockpit-container">
      <img
        src={prefersDarkMode ? imageNight : imageDay}
        alt={EN.cockpit_simulation.ecamAlt}
        className="cockpit-image"
      />
      <EcamDisplay
        pressures={pressures}
        pumps={pumps}
        valves={valves}
        ptus={ptus}
        reservoires={reservoires}
        other={other}
      />
    </div>
  );
};
