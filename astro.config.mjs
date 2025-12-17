// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import sitemap from "@astrojs/sitemap";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Integration to copy .assetsignore to dist directory
function copyAssetsIgnore() {
  return {
    name: "copy-assetsignore",
    hooks: {
      "astro:build:done": () => {
        const source = join(__dirname, ".assetsignore");
        const dest = join(__dirname, "dist", ".assetsignore");
        try {
          copyFileSync(source, dest);
          console.log("✅ Copied .assetsignore to dist directory");
        } catch (error) {
          console.error("❌ Failed to copy .assetsignore:", error);
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
   site: 'https://quedemandelepeuple.fr',
  integrations: [copyAssetsIgnore(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
