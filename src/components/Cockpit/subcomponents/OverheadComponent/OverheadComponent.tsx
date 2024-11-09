import "./OverheadComponent.scss";
import overheadPanelDay from "assets/overhead_panel_day_hyd_offc.webp";
import overheadPanelNight from "assets/overhead_panel_night_hyd_offc.webp";
import engine1buttonDay from "assets/buttons/eng1_day_on.webp";
import engine1buttonNight from "assets/buttons/eng1_night_on.webp";
import engine2buttonDay from "assets/buttons/eng2_day_on.webp";
import engine2buttonNight from "assets/buttons/eng2_night_on.webp";
import ramAirTurbineDay from "assets/buttons/rat_day_on.webp";
import ramAirTurbineNight from "assets/buttons/rat_night_on.webp";
import powerTransferUnitDay from "assets/buttons/ptu_day_on.webp";
import powerTransferUnitNight from "assets/buttons/ptu_night_on.webp";
import blueElectricPumpDay from "assets/buttons/blue_pump_day_on.webp";
import blueElectricPumpNight from "assets/buttons/blue_pump_night_on.webp";
import yellowElectricPumpDay from "assets/buttons/elec_pump_day_on.webp";
import yellowElectricPumpNight from "assets/buttons/elec_pump_night_on.webp";
import { useMediaQuery } from "@mui/material";
import { useHydraulicContext } from "context";
import { Ptus, Pumps } from "types";

import EN from "constants/EN.json";
import { ImageCollection } from "types/overheadTypes";

const images: ImageCollection = {
  day: {
    overheadPanel: overheadPanelDay,
    engine1: engine1buttonDay,
    engine2: engine2buttonDay,
    ramAirTurbine: ramAirTurbineDay,
    powerTransferUnit: powerTransferUnitDay,
    blueElectricPump: blueElectricPumpDay,
    yellowElectricPump: yellowElectricPumpDay,
  },
  night: {
    overheadPanel: overheadPanelNight,
    engine1: engine1buttonNight,
    engine2: engine2buttonNight,
    ramAirTurbine: ramAirTurbineNight,
    powerTransferUnit: powerTransferUnitNight,
    blueElectricPump: blueElectricPumpNight,
    yellowElectricPump: yellowElectricPumpNight,
  },
};

export const OverheadComponent = () => {
  const currentTheme = useMediaQuery("(prefers-color-scheme: dark)")
    ? "night"
    : "day";

  const {
    controls: { handlePumpButton, handlePtuButton },
    pumps,
    ptus,
  } = useHydraulicContext();

  return (
    <div className="overhead-container">
      <img
        src={images[currentTheme]["overheadPanel"]}
        alt={EN.overhead_component.overheadPanel}
        className="overhead-image"
      />
      <button onClick={() => handlePumpButton(Pumps["engine1"])}>
        <img
          src={images[currentTheme]["engine1"]}
          alt={EN.overhead_component.engine1}
          style={{ opacity: pumps["engine1"] ? 0 : 1 }}
          className={`overhead-buttons__${"engine1"}`}
        />
      </button>
      <button onClick={() => handlePumpButton(Pumps["engine2"])}>
        <img
          src={images[currentTheme]["engine2"]}
          alt={EN.overhead_component.engine2}
          style={{ opacity: pumps["engine2"] ? 0 : 1 }}
          className={`overhead-buttons__${"engine2"}`}
        />
      </button>
      <button onClick={() => handlePumpButton(Pumps["ramAirTurbine"])}>
        <img
          src={images[currentTheme]["ramAirTurbine"]}
          alt={EN.overhead_component.rat}
          style={{ opacity: pumps["ramAirTurbine"] ? 1 : 0 }}
          className={`overhead-buttons__${"ramAirTurbine"}`}
        />
      </button>
      <button onClick={() => handlePtuButton(Ptus["powerTransferUnit"])}>
        <img
          src={images[currentTheme]["powerTransferUnit"]}
          alt={EN.overhead_component.ptu}
          style={{ opacity: ptus["powerTransferUnit"] ? 0 : 1 }}
          className={`overhead-buttons__${"powerTransferUnit"}`}
        />
      </button>
      <button onClick={() => handlePumpButton(Pumps["blueElectricPump"])}>
        <img
          src={images[currentTheme]["blueElectricPump"]}
          alt={EN.overhead_component.blueElec}
          style={{ opacity: pumps["blueElectricPump"] ? 0 : 1 }}
          className={`overhead-buttons__${"blueElectricPump"}`}
        />
      </button>
      <button onClick={() => handlePumpButton(Pumps["yellowElectricPump"])}>
        <img
          src={images[currentTheme]["yellowElectricPump"]}
          alt={EN.overhead_component.yellowElec}
          style={{ opacity: pumps["yellowElectricPump"] ? 1 : 0 }}
          className={`overhead-buttons__${"yellowElectricPump"}`}
        />
      </button>
    </div>
  );
};
