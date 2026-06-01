import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import * as path from 'path'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
// @ts-ignore
import {generateVersionPlugin} from './scripts/versionTools'


const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig(async () => ({
    plugins: [
        react(),
        generateVersionPlugin(),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/icons')],
            symbolId: 'icon-[dir]-[name]'
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    clearScreen: false,
    server: {
        port: 1420,
        strictPort: true,
        host: host || false,
        hmr: host
            ? {
                protocol: "ws",
                host,
                port: 1421,
            }
            : undefined,
        watch: {
            ignored: ["**/src-tauri/**"],
        },
    },
}));
