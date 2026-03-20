import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // output folder for Vercel
    sourcemap: false, // optional, can speed up the build
  },
  base: "/", // base path for your project
});
