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
  }
})