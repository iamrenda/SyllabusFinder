import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "manifest.json", dest: "." }, // copy manifest to dist
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "index.html"), // popup React page
        content: resolve(__dirname, "src/services/content.js"), // content script
        background: resolve(__dirname, "src/services/background.js"), // background service worker
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "content") return "content.js";
          if (chunk.name === "background") return "background.js";
          return "assets/[name].js"; // everything else (React)
        },
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
