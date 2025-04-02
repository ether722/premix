import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import vue from '@astrojs/vue'
import svelte from '@astrojs/svelte'
import solidJs from '@astrojs/solid-js'
import db from '@astrojs/db'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [
    // 启用 React 集成
    react({
      include: ['**/react/**/*.{jsx,tsx}'],
    }),
    // 启用 Vue 集成
    vue(),
    // 启用 Svelte 集成
    svelte(),
    // 启用 Solid.js 集成
    solidJs({
      include: ['**/solid/**/*.{jsx,tsx}'],
    }),
    // 启用数据库集成
    db()
  ],
  server: {
    port: 4321,
    host: '127.0.0.1'
  },
  vite: {
    define: {
      'process.env': process.env,
      'global': 'globalThis',
    },
    resolve: {
      alias: {
        '@': '/src',
        'buffer': 'buffer/',
        'process': 'process/browser',
        'util': 'util/',
        'events': 'events',
        'stream': 'stream-browserify',
        'http': 'stream-http',
        'https': 'https-browserify',
        'os': 'os-browserify/browser',
      }
    },
    // 确保开发时 HMR 正常工作
    server: {
      strictPort: true,
      hmr: true
    },
    // 优化构建
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'web3': ['ethers', '@walletconnect/web3-provider'],
          },
        },
      },
    },
    optimizeDeps: {
      include: [
        'buffer',
        'process/browser',
        'util',
        'events',
        'stream-browserify',
        'stream-http',
        'https-browserify',
        'os-browserify/browser',
      ],
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
    },
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    }
  }
}) 