import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5137,
    open: true,
  },
  build: {
    target: "es2015",
  },
});
