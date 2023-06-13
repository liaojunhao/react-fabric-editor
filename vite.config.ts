import { defineConfig, normalizePath } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// import createStyleImportPlugin from 'vite-plugin-style-import';

// 全局 less 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.less'));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
    // createStyleImportPlugin({
    //   libs: [
    //     {
    //       libraryName: 'antd',
    //       esModule: true,
    //       resolveStyle: (name) => {
    //         return `antd/es/${name}/style/index`;
    //       }
    //     }
    //   ]
    // })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      '@assets': path.join(__dirname, 'src/assets')
    }
  },
  // css 相关的配置
  css: {
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    // 指定传递给 CSS 预处理器的选项; 文件扩展名用作选项的键
    preprocessorOptions: {
      less: {
        // additionalData 的内容会在每个 less 文件的开头自动注入
        additionalData: `@import "${variablePath}";`,
        javascriptEnabled: true
      }
    }
  },
  optimizeDeps: {}
});
