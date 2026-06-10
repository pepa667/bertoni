import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
import fs from "fs";

// Carrega os arquivos de tradução
const enTexts = JSON.parse(fs.readFileSync("./locales/en.json", "utf-8"));
const ptTexts = JSON.parse(fs.readFileSync("./locales/pt.json", "utf-8"));

export default defineConfig({
  plugins: [
    tailwindcss(),
    
    // O BLOCO DO HANDLEBARS FICA ASSIM:
    handlebars({
      context(pagePath) {
        // Pega tanto o caminho físico (/br/) quanto a nossa malandragem do dev mode (?lang=br)
        if (pagePath.includes("/br/") || pagePath.includes("lang=br")) {
          return ptTexts;
        }
        return enTexts;
      },
    }),

    // INTERCEPTADOR EXCLUSIVO PARA O DEV MODE (Faz a rota /br/ funcionar sem criar pasta)
    {
      name: "vite-plugin-dev-rewrite-br",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/br" || req.url === "/br/") {
            req.url = "/index.html?lang=br";
          }
          next();
        });
      },
    },
  ],
  server: {
    fs: {
      strict: false,
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        br: resolve(__dirname, "br/index.html"),
      },
    },
  },
});