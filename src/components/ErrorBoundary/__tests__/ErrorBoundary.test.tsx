import { render, screen } from "@testing-library/react";
import { describe, expect, beforeEach, afterEach, vi } from "vitest";
import ErrorBoundary from "../ErrorBoundary";

const ProblemChild = () => {
  throw new Error("Error thrown from problem child");
};

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("GIVEN the child component throws an error", () => {
    test("THEN the error is caught and a fallback UI is displayed", () => {
      render(
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>,
      );

      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  describe("GIVEN the child component works normally", () => {
    test("THEN the error is caught and a fallback UI is displayed", () => {
      render(
        <ErrorBoundary>
          <div>Normal Child</div>
        </ErrorBoundary>,
      );

      expect(screen.getByText(/normal child/i)).toBeInTheDocument();
    });
  });
});
