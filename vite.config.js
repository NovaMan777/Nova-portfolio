import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      // Large animation files in public/nova get locked while they are copied.
      // Watching them crashes Vite on Windows with EBUSY.
      ignored: ["**/public/nova/**"],
    },
  },
});
