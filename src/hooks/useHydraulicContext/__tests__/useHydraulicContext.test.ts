import { mockDefaultHydraulicContext } from "utils/testUtils";
import { useHydraulicContext } from "../useHydraulicContext";

describe("useHydraulicContext", () => {
  describe("WHEN a context is given", () => {
    test("THEM the contenxt should be updated", () => {
      const result = useHydraulicContext(mockDefaultHydraulicContext);

      expect(result).toEqual(mockDefaultHydraulicContext);
    });
  });
  describe("WHEN no context is given", () => {
    test("THEN an error should be thrown", () => {
      expect(() => useHydraulicContext()).toThrow();
    });
  });
});
