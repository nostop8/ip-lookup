import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5174,
    host: true,
  },
  resolve: {
    alias: {
      "@ip-lookup/shared": path.resolve(__dirname, "../shared/src"),
    },
  },
});
