import image from "assets/ecam_and_panel_day_hyd_off.webp";
import "./Ecam.scss";

import { EcamDisplay } from "components";

export const Ecam = () => {
  return (
    <div className="container__ecam">
      <img
        src={image}
        alt="ECAM and panel"
        className="container__ecam__image"
      />
      <EcamDisplay />
    </div>
  );
};
