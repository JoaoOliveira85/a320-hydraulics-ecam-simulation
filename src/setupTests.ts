import "@testing-library/jest-dom";
import { vi } from "vitest";

class WorkerMock {
  onmessage: ((this: Worker, ev: MessageEvent<string>) => void) | null = null;

  postMessage(message: string) {
    if (this.onmessage) {
      // @ts-expect-error - Mocking postMessage
      this.onmessage({ data: message } as MessageEvent<string>);
    }
  }

  terminate() {
    // Implementation not necessary for the purposes of this mock
  }
}

// @ts-expect-error - Mocking Worker
(global as Global).Worker = WorkerMock;

vi.mock("assets/cockpit_day_hyd_on.webp", () => ({
  default: "assets/cockpit_day_hyd_on.webp",
}));
vi.mock("assets/cockpit_night_hyd_on.webp", () => ({
  default: "assets/cockpit_night_hyd_on.webp",
}));

vi.mock("assets/overhead_panel_day_hyd_offc.webp", () => ({
  default: "assets/overhead_panel_day_hyd_offc.webp",
}));

vi.mock("assets/overhead_panel_night_hyd_offc.webp", () => ({
  default: "assets/overhead_panel_night_hyd_offc.webp",
}));

vi.mock("assets/buttons/eng1_day_on.webp", () => ({
  default: "assets/buttons/eng1_day_on.webp",
}));

vi.mock("assets/buttons/eng1_night_on.webp", () => ({
  default: "assets/buttons/eng1_night_on.webp",
}));

vi.mock("assets/buttons/eng2_day_on.webp", () => ({
  default: "assets/buttons/eng2_day_on.webp",
}));

vi.mock("assets/buttons/eng2_night_on.webp", () => ({
  default: "assets/buttons/eng2_night_on.webp",
}));

vi.mock("assets/buttons/rat_day_on.webp", () => ({
  default: "assets/buttons/rat_day_on.webp",
}));

vi.mock("assets/buttons/rat_night_on.webp", () => ({
  default: "assets/buttons/rat_night_on.webp",
}));

vi.mock("assets/buttons/ptu_day_on.webp", () => ({
  default: "assets/buttons/ptu_day_on.webp",
}));

vi.mock("assets/buttons/ptu_night_on.webp", () => ({
  default: "assets/buttons/ptu_night_on.webp",
}));

vi.mock("assets/buttons/blue_pump_day_on.webp", () => ({
  default: "assets/buttons/blue_pump_day_on.webp",
}));

vi.mock("assets/buttons/blue_pump_night_on.webp", () => ({
  default: "assets/buttons/blue_pump_night_on.webp",
}));

vi.mock("assets/buttons/elec_pump_day_on.webp", () => ({
  default: "assets/buttons/elec_pump_day_on.webp",
}));

vi.mock("assets/buttons/elec_pump_night_on.webp", () => ({
  default: "assets/buttons/elec_pump_night_on.webp",
}));
