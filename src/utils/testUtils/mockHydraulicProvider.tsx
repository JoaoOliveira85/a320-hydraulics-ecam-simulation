import { render } from "@testing-library/react";
import { HydraulicProvider } from "context/HydraulicContext/HydraulicContext";

export function renderWithHydraulicProvider(children: React.ReactElement) {
  const mockInitialState = {
    pressures: {
      green: 3000,
      blue: 3000,
      yellow: 3000,
    },
    pumps: {
      engine1: false,
      engine2: false,
      blueElectricPump: false,
      powerTransferUnit: false,
      ramAirTurbine: false,
      yellowElectricPump: false,
    },
    valves: {
      engine1: true,
      engine2: true,
    },
  };

  return render(
    <HydraulicProvider initialState={mockInitialState}>
      {children}
    </HydraulicProvider>,
  );
}
