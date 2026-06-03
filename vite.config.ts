import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// @ts-ignore
import { generateVersionPlugin } from './scripts/versionTools'

const host = process.env.TAURI_DEV_HOST

// https://vite.dev/config/
export default defineConfig(async () => ({
    plugins: [
        react(),
        generateVersionPlugin(),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/icons')],
            symbolId: 'icon-[dir]-[name]',
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    clearScreen: false,
    server: {
        port: 1420,
        strictPort: true,
        host: host || false,
        hmr: host
            ? {
                  protocol: 'ws',
                  host,
                  port: 1421,
              }
            : undefined,
        watch: {
            ignored: ['**/src-tauri/**'],
        },
    },
    build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks(id: string) {
                    if (id.includes('zustand')) {
                        return 'zustand'
                    } else if (id.includes('es-toolkit')) {
                        return 'es-toolkit'
                    } else if (id.includes('okx')) {
                        return 'okx'
                    } else if (id.includes('charts')) {
                        return 'charts'
                    } else if (id.includes('tauri')) {
                        return 'tauri'
                    } else if (id.includes('node_modules')) {
                        return 'vendor'
                    }
                },
            },
        },
    },
}))
