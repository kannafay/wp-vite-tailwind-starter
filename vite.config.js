/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'
import copy from 'rollup-plugin-copy'

export default defineConfig({
    resolve: { alias: { '@': resolve(__dirname, 'src') } },
    plugins: [
        tailwindcss(),
        copy({
            targets: [
                { src: 'src/images', dest: 'assets' }, // 复制图片文件夹到输出目录
            ],
            hook: 'writeBundle',
            copyOnce: false,
        }),
    ],
    build: {
        outDir: resolve(__dirname, 'assets'),
        emptyOutDir: true, // 每次构建前清空输出目录
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/main.js'),
            },
            output: {
                entryFileNames: 'js/main.min.js',
                chunkFileNames: 'js/[name]-[hash].min.js',
                assetFileNames: () => 'css/style.min.css',
            },
        },
    },
    server: {
        port: 777, // 与 functions.php 中的 VITE_PORT 常量保持一致
        strictPort: true,
        cors: true,
    },
})
