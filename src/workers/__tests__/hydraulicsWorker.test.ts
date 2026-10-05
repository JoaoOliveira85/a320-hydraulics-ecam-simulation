import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { WorkerActions } from "types/hydraulicWorkerTypes";

type Update = { pressures: { green: number; yellow: number; blue: number } };

const send = (data: Record<string, unknown>) =>
  (window.onmessage as unknown as (e: { data: unknown }) => void)({ data });

describe("hydraulicsWorker", () => {
  const updates: Update[] = [];

  beforeEach(async () => {
    vi.useFakeTimers();
    vi.resetModules();
    updates.length = 0;
    vi.stubGlobal("postMessage", (message: Update & { type: string }) => {
      if (message.type === "update") updates.push(message);
    });
    await import("../hydraulicsWorker");
  });

  afterEach(() => {
    send({ type: WorkerActions.RESET_SIMULATION });
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  const tick = (count: number) => {
    for (let i = 0; i < count; i++) vi.advanceTimersByTime(100);
    return updates[updates.length - 1];
  };

  it("drops pressure once per tick on a line fed by the RAT", () => {
    send({
      type: WorkerActions.SET_PUMP_STATE,
      pump: "blueElectricPump",
      state: false,
    });
    send({
      type: WorkerActions.SET_PUMP_STATE,
      pump: "ramAirTurbine",
      state: true,
    });

    expect(tick(2).pressures.blue).toBe(100);
  });

  it("drops pressure once per tick on a line fed by the PTU", () => {
    send({
      type: WorkerActions.SET_PUMP_STATE,
      pump: "engine2",
      state: false,
    });

    expect(tick(7).pressures.yellow).toBe(0);
    expect(tick(1).pressures.yellow).toBe(400);
  });
});
