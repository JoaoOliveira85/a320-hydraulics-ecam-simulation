import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default defineConfig({
  ...viteConfig,
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["vitest-canvas-mock", "./src/setupTests.ts"],
    exclude: ["node_modules", "dist", "build", "src/**/__test__/**"],
    coverage: {
      provider: "istanbul",
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: [
        "src/**/*.d.ts",
        "src/**/index.ts",
        "src/**/__tests__/**",
        "src/utils/testUtils/**",
        "src/main.tsx",
      ],
    },
  },
});
