import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
import fs from "fs";

const enTexts = JSON.parse(fs.readFileSync("./locales/en.json", "utf-8"));
const ptTexts = JSON.parse(fs.readFileSync("./locales/pt.json", "utf-8"));

export default defineConfig(({ command }) => {
  return {
    plugins: [
      tailwindcss(),

      handlebars({
        context(pagePath) {
          if (pagePath === "/br/index.html") {
            return { ...ptTexts, pagePath: "/br/index.html" };
          }
          return { ...enTexts, pagePath };
        },
        helpers: {
          includes: (str, search) => {
            if (!str) return false;
            return str.includes(search);
          }
        }
      }),

      {
        name: "vite-plugin-dev-preview-br",
        apply: "serve",
        enforce: "pre",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === "/br" || req.url === "/br/" || req.url === "/br/index.html") {
              const html = fs.readFileSync(resolve(__dirname, "index.html"), "utf-8");
              const transformed = await server.transformIndexHtml("/br/index.html", html);
              res.statusCode = 200;
              res.setHeader("content-type", "text/html; charset=utf-8");
              res.end(transformed);
              return;
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
        // O PULO DO GATO: Só exige o arquivo físico "br/index.html" se for o build final!
        input: command === "serve"
          ? { main: resolve(__dirname, "index.html") }
          : {
            main: resolve(__dirname, "index.html"),
            br: resolve(__dirname, "br/index.html"), // (Lembra de criar esse arquivo se for buildar de fato!)
          },
      },
    },
  };
});