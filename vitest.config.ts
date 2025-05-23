import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    include: [
      "components/**/*.{test,spec}.{js,ts,jsx,tsx}",
      "hooks/**/*.{test,spec}.{js,ts,jsx,tsx}",
    ],
  },
});
