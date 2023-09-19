import { defineConfig, loadEnv } from "vite";
import path from "path";
import vue from '@vitejs/plugin-vue'

export default ({mode})=> {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}
  process.env.VITE_APP_VERSION = process.env.npm_package_version

  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name].js",
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name?.split(".").at(1) ?? "";
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = "img";
            }
            return `assets/${extType}/[name][extname]`;
          },
          entryFileNames: "assets/js/[name].js",
        },
      },
    },
  });
}
