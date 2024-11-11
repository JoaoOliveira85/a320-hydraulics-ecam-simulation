import { screen } from "@testing-library/react";
import {
  mockDefaultHydraulicContext,
  mockHydraulicContext,
  renderWithWrappers,
} from "utils/testUtils";
import { RealTimeData } from "../RealTimeData";

describe("RealTimeData", () => {
  describe("GIVEN the component is rendered", () => {
    test("THEN it's rendered as expected", () => {
      const { asFragment } = renderWithWrappers(<RealTimeData />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe("GIVEN the engine data changes", () => {
    test("THEN the engine data is updated", () => {
      const newContext = { ...mockDefaultHydraulicContext };
      newContext.pumps.engine1 = false;

      mockHydraulicContext(newContext);
      renderWithWrappers(<RealTimeData />);

      const engine1 = screen.getByTestId("realTimeData-pump_status-engine1");
      expect(engine1).toHaveTextContent("Inactive");
    });
  });
  describe("GIVEN the valve data changes", () => {
    test("THEN the valve data is updated", () => {
      const newContext = { ...mockDefaultHydraulicContext };
      newContext.valves.engine1 = false;
      mockHydraulicContext(newContext);

      renderWithWrappers(<RealTimeData />);

      const engine1 = screen.getByTestId("realTimeData-valve_status-engine1");
      expect(engine1).toHaveTextContent("Closed");
    });
  });
});
