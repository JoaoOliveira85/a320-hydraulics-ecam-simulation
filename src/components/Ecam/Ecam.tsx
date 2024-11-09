import imageDay from "assets/ecam_and_panel_day_hyd_on.webp";
import imageNight from "assets/ecam_and_panel_night_hyd_on.webp";
import "./Ecam.scss";

import { EcamDisplay } from "components";
import { useMediaQuery } from "@mui/material";
import { useHydraulicContext } from "context";

import EN from "constants/EN.json";

export const Ecam = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { reservoires, pressures, pumps, valves, ptus, other } =
    useHydraulicContext();

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
