import { defineConfig, normalizePath } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// 全局 less 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve("./src/variable.less"));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@assets": path.join(__dirname, "src/assets"),
    },
  },
  // css 相关的配置
  css: {
    preprocessorOptions: {
      less: {
        // additionalData 的内容会在每个 less 文件的开头自动注入
        additionalData: `@import "${variablePath}";`,
      },
    },
  },
});
