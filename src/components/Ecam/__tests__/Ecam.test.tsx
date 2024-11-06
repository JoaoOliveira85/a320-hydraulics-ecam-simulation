import { render } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import { Ecam } from "../Ecam";
import { HydraulicProvider } from "context/HydraulicContext/HydraulicContext";

class WorkerMock {
  onmessage: ((this: Worker, ev: MessageEvent<string>) => void) | null = null;

  postMessage(message: string) {
    if (this.onmessage) {
      // @ts-expect-error - Mocking postMessage
      this.onmessage({ data: message } as MessageEvent<string>);
    }
  }

  terminate() {}
}

// @ts-expect-error - Mocking Worker
(global as Global).Worker = WorkerMock;

describe("Ecam Component", () => {
  test("Renders layout component", () => {
    const { asFragment } = render(
      <HydraulicProvider>
        <Ecam />
      </HydraulicProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
