import React, { useRef, useState } from 'react';
import { StoreType } from '../model/store';

import Page from './page';

export type WorkspaceProps = {
  store: StoreType;
  components?: any;
  paddingX?: number;
  paddingY?: number;
};
const WorkspaceCanvas: React.FC<WorkspaceProps> = ({ store, paddingX, paddingY }) => {
  const [size, setSize] = useState({ width: 100, height: 100 });
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const w = store.bleedVisible ? Math.max(0, ...store.pages.map((e) => e.bleed)) : 0;
  const computedWidth = Math.max(...store.pages.map((e) => e.computedWidth));
  const computedHeight = Math.max(...store.pages.map((e) => e.computedHeight));
  console.log(computedWidth);
  const x = computedWidth + 2 * w;
  const k = computedHeight + 2 * w;

  const h = null != paddingX ? paddingX : 20;
  const C = k * store.scale * store.pages.length;
  const g = null != paddingY ? paddingY : 55;

  const P = Math.max(h, (size.width - x * store.scale) / 2);
  const M = Math.max(g, (size.height - C) / store.pages.length / 2);

  // 当前页
  const O = store.pages.indexOf(store.activePage);
  const N = Math.min(3, Math.max(1, Math.ceil(size.height / 2 / (k * store.scale))));

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        outline: 'none',
        flex: 1,
        backgroundColor: 'rgba(232, 232, 232, 0.9)',
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
            ></Page>
          ) : (
            <div key={r.id}>{r.id + '123'}</div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkspaceCanvas;
