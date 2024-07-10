import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import multi from '@rollup/plugin-multi-entry';
import multiInput from 'rollup-plugin-multi-input';
import { babel } from '@rollup/plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';

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
  env,
  isProd = false,
  ignoreLess = true,
  extractOneCss = false,
  extractMultiCss = false,
} = {}) => {
  const plugins = [
    nodeResolve(),
    commonjs(),
    babel({ babelHelpers: 'runtime', extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'] }),
  ];

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
