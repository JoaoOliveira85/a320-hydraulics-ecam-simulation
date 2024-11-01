import "./LayoutConstructor.scss";
import { Ecam } from "components/Ecam";

export const LayoutConstructor = () => {
  return (
    <div className="container">
      <div className="left-container">
        <Ecam />
      </div>
      <div className="right-container">
        <div className="right-container__header">
          <h1>ECAM</h1>
        </div>
        <div className="right-container__content">
          <p>Electronic Centralized Aircraft Monitor</p>
        </div>
      </div>
    </div>
  );
};
