import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev server on port 3000 so it matches the backend's CORS origin
export default defineConfig({
  plugins: [react()],
  server: { port: 3000, strictPort: true },
});
