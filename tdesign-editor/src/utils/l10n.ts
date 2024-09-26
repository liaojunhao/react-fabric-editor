import { observable } from 'mobx';

const translation = observable({
  workspace: {
    noPages: '没有任何页面...',
    addPage: '添加页面',
    removePage: '删除页面',
    duplicatePage: '复制页面',
    moveUp: '上移',
    moveDown: '下移',
  },
});

const isObject = (value) => value && 'object' == typeof value;
function getValue(e, o) {
  var t,
    a = o.split('.'),
    n = e;
  for (t = 0; t < a.length; ++t) {
    if (null == n[a[t]]) return;
    n = n[a[t]];
  }
  return n;
}

const WARNED = {};

export const getName = (path: string) => {
  const val = getValue(translation, path);
  if (val) {
    return val;
  }
  WARNED[path] || ((WARNED[path] = !0), console.warn(`Missing translation '${path}'`));
  const t = path.split('.');
  const a = t[t.length - 1] || ' ';
  return a.charAt(0).toUpperCase() + a.slice(1);
};
