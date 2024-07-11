import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], ignorePatterns: ['lib/', 'node_modules/', 'static/'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    // 0 关闭
    // 1 警告
    // 2 报错
    rules: {
      'max-len': [1, 130], // 长过130就给予警告
      eqeqeq: 2, // 必须用三等于号做比较
    },
  },
];
