import {
  defineConfig,
  loadEnv
} from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver
} from 'unplugin-vue-components/resolvers'
import {
  createHtmlPlugin
} from 'vite-plugin-html';
import {
  resolve
} from 'path';
import {
  VitePWA
} from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default ({
  mode
}) => defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createHtmlPlugin({
      minify: true,
      template: 'index.html',
      inject: {
        data: {
          title: loadEnv(mode, process.cwd()).VITE_SITE_NAME,
        },
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        runtimeCaching: [{
            urlPattern: /(.*?)\.(js|css|woff2|woff|ttf)/, // js / css 静态资源缓存
            handler: 'CacheFirst',
            options: {
              cacheName: 'js-css-cache',
            },
          },
          {
            urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 图片缓存
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
            },
          },
        ],
      },
      manifest: {
        "name": "無名の主页",
        "short_name": "無名の主页",
        "description": "一个默默无闻的主页",
        "display": "standalone",
        "start_url": "/",
        "theme_color": "#424242",
        "background_color": "#424242",
        "icons": [{
          "src": "/images/icon/48.png",
          "sizes": "48x48",
          "type": "image/png"
        }, {
          "src": "/images/icon/72.png",
          "sizes": "72x72",
          "type": "image/png"
        }, {
          "src": "/images/icon/96.png",
          "sizes": "96x96",
          "type": "image/png"
        }, {
          "src": "/images/icon/128.png",
          "sizes": "128x128",
          "type": "image/png"
        }, {
          "src": "/images/icon/144.png",
          "sizes": "144x144",
          "type": "image/png"
        }, {
          "src": "/images/icon/192.png",
          "sizes": "192x192",
          "type": "image/png"
        }, {
          "src": "/images/icon/512.png",
          "sizes": "512x512",
          "type": "image/png"
        }]
      }
    }),
  ],
  server: {
    port: "3000",
    hmr: true,
  },
  resolve: {
    alias: [{
      find: '@',
      replacement: resolve(__dirname, "src"),
    }, ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `@import "./src/style/global.scss";`
      }
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        // 生产环境时移除 console
        pure_funcs: ['console.log'],
      },
    },
  },
})