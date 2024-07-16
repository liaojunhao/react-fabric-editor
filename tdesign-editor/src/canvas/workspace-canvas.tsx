import React, { useRef, useState, useLayoutEffect } from 'react';
import { StoreType } from '../model/store';

import Page from './page';
const ZERO_SIZE_WARNING =
  'Polotno 警告：<Workspace /> 组件无法自动检测其大小。父元素的宽度或高度等于 0。请确保其大小不为零。您可能需要使用样式进行调整。<Workspace /> 将自动适应父容器。为了便于调试，这里是父元素的日志：';

const PagePlaceholder = ({ width, height, xPadding, yPadding, backgroundColor: n }) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        backgroundColor: n,
        paddingLeft: xPadding,
        paddingRight: xPadding,
        paddingTop: yPadding,
        paddingBottom: yPadding,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ width: ' 100%', height: '100%', backgroundColor: 'white' }}></div>
    </div>
  );
};

export type WorkspaceProps = {
  store: StoreType;
  components?: any;
  paddingX?: number;
  paddingY?: number;
  backgroundColor?: string;
};
const WorkspaceCanvas: React.FC<WorkspaceProps> = ({ store, paddingX, paddingY, backgroundColor }) => {
  const h = null != paddingX ? paddingX : 20;
  const g = null != paddingY ? paddingY : 55;
  const [size, setSize] = useState({ width: 100, height: 100 });
  const m = useRef(size);
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const w = store.bleedVisible ? Math.max(0, ...store.pages.map((e) => e.bleed)) : 0;
  const computedWidth = Math.max(...store.pages.map((e) => e.computedWidth));
  const computedHeight = Math.max(...store.pages.map((e) => e.computedHeight));
  const x = computedWidth + 2 * w;
  const k = computedHeight + 2 * w;

  const y = async ({ skipTimeout } = { skipTimeout: false }) => {
    if ((skipTimeout || (await new Promise((e) => setTimeout(e, 50))), null === containerRef.current)) return;
    const r = containerRef.current.getBoundingClientRect();
    (0 !== r.width && 0 !== r.height) || (console.warn(ZERO_SIZE_WARNING), console.log(containerRef.current));
    const a = innerRef.current.clientWidth || r.width,
      n = { width: a, height: r.height };
    (m.current.width !== n.width || m.current.height !== n.height) && (setSize(n), (m.current = n));
    const l = (a - 2 * h) / x,
      o = (r.height - 2 * g) / k,
      c = Math.max(Math.min(l, o), 0.01);
    store.scaleToFit !== c && (store.setScale(c), store._setScaleToFit(c));
  };

  useLayoutEffect(() => {
    y({ skipTimeout: true });
  }, []);

  const P = Math.max(h, (size.width - x * store.scale) / 2);
  const C = k * store.scale * store.pages.length;
  const M = Math.max(g, (size.height - C) / store.pages.length / 2);

  // 当前页
  const O = store.pages.indexOf(store.activePage);
  const N = Math.min(3, Math.max(1, Math.ceil(size.height / 2 / (k * store.scale))));

  // 确定
  const bgColor = backgroundColor || 'rgba(232, 232, 232, 0.9)';

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        outline: 'none',
        flex: 1,
        backgroundColor: bgColor,
      }}
      tabIndex={0}
      className="tdesign-workspace-container"
    >
      <div
        ref={innerRef}
        onScroll={(e) => {}}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'auto',
          overflowX: 'hidden',
        }}
        className="tdesign-workspace-inner"
      >
        {store.pages.map((r, c) => {
          return Math.abs(c - O) <= N || r._exportingOrRendering ? (
            <Page
              key={r.id}
              page={r}
              store={store}
              xPadding={P}
              yPadding={M}
              width={x * store.scale + 2 * P}
              height={k * store.scale + 2 * M}
              backColor={bgColor}
            ></Page>
          ) : (
            <PagePlaceholder
              key={r.id}
              width={x * store.scale + 2 * P}
              height={k * store.scale + 2 * M}
              backgroundColor={bgColor}
              xPadding={P}
              yPadding={M}
            ></PagePlaceholder>
          );
        })}
      </div>
    </div>
  );
};

export default WorkspaceCanvas;
