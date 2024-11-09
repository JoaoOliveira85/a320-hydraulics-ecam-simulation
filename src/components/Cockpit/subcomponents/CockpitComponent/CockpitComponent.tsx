import imageDay from "assets/cockpit_day_hyd_on.webp";
import imageNight from "assets/cockpit_night_hyd_on.webp";
import "./CockpitComponent.scss";

import { EcamDisplay } from "components";
import { useMediaQuery } from "@mui/material";
import { useHydraulicContext } from "context";

import EN from "constants/EN.json";

export const CockpitComponent = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { pressures, pumps, valves, ptus, reservoires, other } =
    useHydraulicContext();

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
