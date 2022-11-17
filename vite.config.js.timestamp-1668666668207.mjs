// vite.config.js
import {
  defineConfig,
  loadEnv
} from "file:///D:/Html/WorkSpace/Home/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Html/WorkSpace/Home/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/Html/WorkSpace/Home/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/Html/WorkSpace/Home/node_modules/unplugin-vue-components/dist/vite.mjs";
import {
  ElementPlusResolver
} from "file:///D:/Html/WorkSpace/Home/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import {
  createHtmlPlugin
} from "file:///D:/Html/WorkSpace/Home/node_modules/vite-plugin-html/dist/index.mjs";
import {
  resolve
} from "path";
var __vite_injected_original_dirname = "D:\\Html\\WorkSpace\\Home";
var vite_config_default = ({
  mode
}) => defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    createHtmlPlugin({
      minify: true,
      template: "index.html",
      inject: {
        data: {
          title: loadEnv(mode, process.cwd()).VITE_SITE_NAME
        }
      }
    })
  ],
  server: {
    port: "3000",
    hmr: true
  },
  resolve: {
    alias: [{
      find: "@",
      replacement: resolve(__vite_injected_original_dirname, "src")
    }]
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `@import "./src/style/global.scss";`
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxIdG1sXFxcXFdvcmtTcGFjZVxcXFxIb21lXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxIdG1sXFxcXFdvcmtTcGFjZVxcXFxIb21lXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9IdG1sL1dvcmtTcGFjZS9Ib21lL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHtcbiAgZGVmaW5lQ29uZmlnLFxuICBsb2FkRW52XG59IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQge1xuICBFbGVtZW50UGx1c1Jlc29sdmVyXG59IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCB7XG4gIGNyZWF0ZUh0bWxQbHVnaW5cbn0gZnJvbSAndml0ZS1wbHVnaW4taHRtbCc7XG5pbXBvcnQge1xuICByZXNvbHZlXG59IGZyb20gJ3BhdGgnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgKHtcbiAgbW9kZVxufSkgPT4gZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgfSksXG4gICAgY3JlYXRlSHRtbFBsdWdpbih7XG4gICAgICBtaW5pZnk6IHRydWUsXG4gICAgICB0ZW1wbGF0ZTogJ2luZGV4Lmh0bWwnLFxuICAgICAgaW5qZWN0OiB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB0aXRsZTogbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKS5WSVRFX1NJVEVfTkFNRSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IFwiMzAwMFwiLFxuICAgIGhtcjogdHJ1ZSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiBbe1xuICAgICAgZmluZDogJ0AnLFxuICAgICAgcmVwbGFjZW1lbnQ6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSxcbiAgICB9LCBdXG4gIH0sXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIHNjc3M6IHtcbiAgICAgICAgY2hhcnNldDogZmFsc2UsXG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcIi4vc3JjL3N0eWxlL2dsb2JhbC5zY3NzXCI7YFxuICAgICAgfVxuICAgIH1cbiAgfVxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQTRQO0FBQUEsRUFDMVA7QUFBQSxFQUNBO0FBQUEsT0FDSztBQUNQLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QjtBQUFBLEVBQ0U7QUFBQSxPQUNLO0FBQ1A7QUFBQSxFQUNFO0FBQUEsT0FDSztBQUNQO0FBQUEsRUFDRTtBQUFBLE9BQ0s7QUFmUCxJQUFNLG1DQUFtQztBQWtCekMsSUFBTyxzQkFBUSxDQUFDO0FBQUEsRUFDZDtBQUNGLE1BQU0sYUFBYTtBQUFBLEVBQ2pCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLElBQ25DLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLElBQ25DLENBQUM7QUFBQSxJQUNELGlCQUFpQjtBQUFBLE1BQ2YsUUFBUTtBQUFBLE1BQ1IsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLFFBQ04sTUFBTTtBQUFBLFVBQ0osT0FBTyxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUMsRUFBRTtBQUFBLFFBQ3RDO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxFQUNQO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPLENBQUM7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLGFBQWEsUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDdkMsQ0FBRztBQUFBLEVBQ0w7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLFNBQVM7QUFBQSxRQUNULGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
