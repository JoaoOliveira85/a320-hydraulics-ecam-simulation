import imageDay from "assets/ecam_and_panel_day_hyd_on.webp";
import imageNight from "assets/ecam_and_panel_night_hyd_on.webp";
import "./Ecam.scss";

import { EcamDisplay } from "components";
import { useMediaQuery } from "@mui/material";
import { useHydraulicContext } from "context";

export const Ecam = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { pressures, pumps, valves } = useHydraulicContext();

  return (
    <div className="container__ecam">
      <img
        src={prefersDarkMode ? imageNight : imageDay}
        alt="ECAM and panel"
        className="container__ecam__image"
      />
      <EcamDisplay pressures={pressures} pumps={pumps} valves={valves} />
    </div>
  );
};
