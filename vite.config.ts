import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        tsconfigPaths(),
        ...VitePluginNode({
            adapter: 'express',
            appPath: './src/app.ts',
            exportName: 'default',
            tsCompiler: 'esbuild',
        }),
    ],
    server: {
        port: 8080,
    },
    build: {
        target: 'esnext',
        outDir: 'dist',
        rollupOptions: {
            output: {
                format: 'es',
            },
        },
    },
});