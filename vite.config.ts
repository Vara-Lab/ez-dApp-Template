import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [
      'localhost',
      '3000-varalab-ezdapptemplate-6z0awdskol2.ws-us118.gitpod.io'
    ]
  },
  plugins: [
    react(),
    nodePolyfills(),
    svgr(),
    checker({
      typescript: true,
      eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"', dev: { logLevel: ['error'] } },
    }),
  ],

  resolve: { alias: { '@': '/src' } },
});
