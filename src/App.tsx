import image from "./assets/ecam_and_panel_day_hyd_off.webp";
import "./App.css";

export function App() {
  return (
    <div id="container">
      <div id="container__ecam">
        <img src={image} alt="ECAM and panel" id="container__ecam__image" />
      </div>
    </div>
  );
}
