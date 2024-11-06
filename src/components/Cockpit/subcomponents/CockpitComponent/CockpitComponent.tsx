import imageDay from "assets/cockpit_day_hyd_on.webp";
import imageNight from "assets/cockpit_night_hyd_on.webp";
import "./CockpitComponent.scss";

import { EcamDisplay } from "components";
import { useMediaQuery } from "@mui/material";
import { useHydraulicContext } from "context";

export const CockpitComponent = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { pressures, pumps, valves } = useHydraulicContext();

  return (
    <div className="cockpit-container">
      <img
        src={prefersDarkMode ? imageNight : imageDay}
        alt="ECAM and panel"
        className="cockpit-image"
      />
      <EcamDisplay pressures={pressures} pumps={pumps} valves={valves} />
    </div>
  );
};
