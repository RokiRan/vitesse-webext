import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import { sharedConfig } from './vite.config'
import { isDev, r } from './scripts/utils'
import windiConfig from './windi.config'
import packageJson from './package.json'

// bundling the content script using Vite
export default defineConfig({
  ...sharedConfig,
  build: {
    watch: isDev
      ? {}
      : undefined,
    outDir: r('extension/dist/injectScripts'),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    lib: {
      entry: r('src/inject/tools.js'),
      name: packageJson.name,
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.inject.js',
        extend: true,
      },
    },
  },
  plugins: [
    ...sharedConfig.plugins!,

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS({
      config: {
        ...windiConfig,
        // disable preflight to avoid css population
        preflight: false,
      },
    }),
  ],
})
