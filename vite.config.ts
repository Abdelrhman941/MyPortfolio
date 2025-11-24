import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    base: '/MyPortfolio/',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react({
        // Use SWC for faster builds
        babel: {
          plugins: [
            // Remove console logs in production
            mode === 'production' && ['transform-remove-console', { exclude: ['error', 'warn'] }],
          ].filter(Boolean),
        },
      }),
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    // Ultra-performance build optimizations
    build: {
      // Enable minification with terser for better compression
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.logs in production
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'], // Remove specific console methods
          passes: 2, // Multiple passes for better compression
        },
        mangle: {
          safari10: true, // Fix Safari 10 bugs
        },
        format: {
          comments: false, // Remove all comments
        },
      },
      // Code splitting for better caching
      rollupOptions: {
        output: {
          // Manual chunks for better long-term caching
          manualChunks: {
            // React core - rarely changes
            'react-core': ['react', 'react-dom'],
            // Heavy 3D libraries - separate chunk
            'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
            // Animation libraries
            'animation': ['motion', 'react-blurhash'],
          },
          // Optimize chunk file names
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split('.') || [];
            const ext = info[info.length - 1];
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif)$/i.test(assetInfo.name || '')) {
              return `assets/img/[name]-[hash].${ext}`;
            } else if (/\.css$/i.test(assetInfo.name || '')) {
              return `assets/css/[name]-[hash].${ext}`;
            } else if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
              return `assets/fonts/[name]-[hash].${ext}`;
            }
            return `assets/[name]-[hash].${ext}`;
          },
        },
      },
      // Optimize chunk size (1000kb = 1MB warning threshold)
      chunkSizeWarningLimit: 1000,
      // Enable CSS code splitting for better caching
      cssCodeSplit: true,
      // Source maps only in development
      sourcemap: mode === 'development',
      // Target modern browsers for smaller bundle
      target: 'esnext',
      // Enable module preloading for faster initial load
      modulePreload: {
        polyfill: true,
      },
      // Optimize CSS
      cssMinify: true,
      // Report compressed size for analysis
      reportCompressedSize: true,
    },
    // Optimize dependencies pre-bundling
    optimizeDeps: {
      include: ['react', 'react-dom', 'motion'],
      exclude: ['three'], // Three.js is already optimized
      esbuildOptions: {
        // Target modern browsers
        target: 'esnext',
      },
    },
    // Performance hints
    esbuild: {
      // Drop console and debugger in production
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      // Legal comments in separate file
      legalComments: 'none',
    },
  }
})
