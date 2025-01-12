import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "days/day1": resolve(__dirname, "days/day1.html"),
      },
    },
  },
});
