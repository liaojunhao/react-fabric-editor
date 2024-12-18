import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import multi from '@rollup/plugin-multi-entry';
import multiInput from 'rollup-plugin-multi-input';
import { babel } from '@rollup/plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

import pkg from '../package.json' assert { type: 'json' };

const name = 'design-editor';
const externalDeps = Object.keys(pkg.dependencies || {});
const externalPeerDeps = Object.keys(pkg.peerDependencies || {});
const banner = `/**
 * ${name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */
`;
const input = 'src/index-lib.ts';
const inputList = ['src/**/*.ts', 'src/**/*.jsx', 'src/**/*.tsx', '!src/**/*.d.ts'];

const getPlugins = ({
  env, // 环境
  isProd = false, // 是否是生产环境的大包
  ignoreLess = true, // 是否忽略less的导入
  extractOneCss = false, // 是否提取一份CSS
  extractMultiCss = false, // 是否提取多CSS
} = {}) => {
  const plugins = [
    nodeResolve({
      extensions: ['.tsx', '.ts', ...DEFAULT_EXTENSIONS], // 指定扩展名的解析顺序
    }),
    commonjs(),
    babel({ babelHelpers: 'runtime', extensions: ['.tsx', '.ts', ...DEFAULT_EXTENSIONS] }),
    postcss({
      plugins: [],
      autoModules: true,
      extract: `${isProd ? `${name}.min` : name}.css`,
      minimize: isProd,
      sourceMap: true,
      extensions: ['.sass', '.scss', '.css', '.less'],
    }),
    replace({
      preventAssignment: true,
      values: {
        __VERSION__: JSON.stringify(pkg.version),
      },
    }),
  ];

  if (env) {
    plugins.push(
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify(env),
        },
      }),
    );
  }

  // 是否是生产环境（生产环境就压缩）
  if (isProd) {
    plugins.push(
      terser({
        output: {
          /* eslint-disable */
          ascii_only: true,
          /* eslint-enable */
        },
      }),
    );
  }

  return plugins;
};

// 按需加载组件 不带 css 样式
const libConfig = {
  input: inputList.concat('!src/index-lib.ts'),
  external: externalDeps.concat(externalPeerDeps),
  plugins: [multiInput()].concat(getPlugins({ extractMultiCss: true })),
  output: {
    banner,
    dir: 'lib/',
    format: 'esm',
    sourcemap: true,
    chunkFileNames: '_chunks/dep-[hash].js',
  },
};

export default [libConfig];
