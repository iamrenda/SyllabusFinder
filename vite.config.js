import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        { src: "public/manifest.json", dest: "." },
        { src: "public/icon.png", dest: "." },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        sidePanel: resolve(__dirname, "src/sidepanel/index.html"),
        background: resolve(__dirname, "src/services/background.js"),
        content: resolve(__dirname, "src/services/content.js"),
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "content") return "content.js";
          if (chunk.name === "background") return "background.js";
          if (chunk.name === "popup") return "assets/popup.js";
          return "assets/[name].js";
        },
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
