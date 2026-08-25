import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    // Bun may install Astro's Vite copy separately even at the same version.
    plugins: [tailwindcss() as never],
  },
});
