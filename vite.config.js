import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "@primevue/auto-import-resolver";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import ZiggyPlugin from "./resources/js/ziggy-vite-plugin.js";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.ts",
            refresh: true
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false
                }
            }
        }),
        tailwindcss(),
        Components({
            resolvers: [PrimeVueResolver()]
        }),
        ZiggyPlugin({ declarations: true })
    ],
    server: {
        host: "0.0.0.0",
        hmr: {
            host: "192.168.0.5"
        }
    }, resolve: {
        alias: {
            "@": resolve(__dirname, "./resources/js"),
            "ziggy-js": resolve("vendor/tightenco/ziggy")
        }
    }
});
