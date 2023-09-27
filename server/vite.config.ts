
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
    test: {
        globals: true,
        setupFiles: "./src/__tests__/setup.ts",
    },
});