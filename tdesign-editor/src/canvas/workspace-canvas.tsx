import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { StoreType } from '../model/store';
import { observer } from 'mobx-react-lite';

import Page from './page';
const ZERO_SIZE_WARNING =
  'Polotno 警告：<Workspace /> 组件无法自动检测其大小。父元素的宽度或高度等于 0。请确保其大小不为零。您可能需要使用样式进行调整。<Workspace /> 将自动适应父容器。为了便于调试，这里是父元素的日志：';

const useSaveScrollOnScaleChange = (e, t, r, a, n, l) => {
  const o = useRef({ width: t, height: r });
  const c = useRef({ top: 0, left: 0 });
  const s = useRef(!1);
  const i = useRef(n.pages.length);
  s.current = i.current !== n.pages.length;
  i.current = n.pages.length;
  useEffect(() => {
    const t = e.current;
    const r = (e) => {
      c.current = { top: t.scrollTop, left: t.scrollLeft };
    };
    t.addEventListener('scroll', r);
    return () => {
      t.removeEventListener('scroll', r);
    };
  }, []);
  useLayoutEffect(() => {
    if (!e.current) return;
    if (s.current) return;
    const a = e.current;
    const n = (c.current.left + a.offsetWidth / 2) / o.current.width;
    const i = (c.current.top + a.offsetHeight / 2) / o.current.height;
    l.current = !0;
    a.scrollLeft = n * t - a.offsetWidth / 2;
    a.scrollTop = i * r - a.offsetHeight / 2;
    o.current = { width: t, height: r };
  }, [a, t, r]);
};

const useScrollOnActiveChange = (e, t, r, a, n) => {
  const l = useRef(!1);
  const o = useRef(null);
  useEffect(() => {
    const t = e.current;
    const r = () => {
      n.current;
    };
    t.addEventListener('scroll', r);
    return () => {
      t.removeEventListener('scroll', r);
    };
  }, []);
  const c = r.pages.indexOf(r.activePage);
  useLayoutEffect(() => {
    if (!r.activePage) return;
    if (!e.current) return;
    if (l.current) return;
    const a = e.current;
    const o = r.pages.indexOf(r.activePage) * t;
    Math.abs(o - a.scrollTop) > 0.5 * t && ((n.current = !0), (a.scrollTop = o));
  }, [r.activePage, c]);
  return {
    handleScroll: (e) => {
      if (n.current) {
        n.current = !1;
        return;
      }
      n.current = !1;
      l.current = !0;
      clearTimeout(o.current);
      o.current = setTimeout(() => {
        l.current = !1;
      }, 300);
      const t = e.currentTarget.childNodes[0].offsetHeight;
      const c = e.currentTarget.scrollTop;
      const s = Math.floor((c + a.height / 3) / t);
      const i = r.pages[s];
      console.log(i);
      i && i.select();
    },
  };
};

const NoPages = ({ store }: { store: StoreType }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}
    >
      <p>There are no pages yet...</p>
      <button
        onClick={() => {
          store.addPage({});
        }}
      >
        Add page
      </button>
    </div>
  );
};

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
  pageBorderColor?: string;
  activePageBorderColor?: string;
  pageControlsEnabled?: boolean;
};
const WorkspaceCanvas: React.FC<WorkspaceProps> = ({
  store,
  paddingX,
  paddingY,
  backgroundColor,
  pageBorderColor,
  activePageBorderColor,
  components,
  pageControlsEnabled,
}) => {
  const h = null != paddingX ? paddingX : 20;
  const g = null != paddingY ? paddingY : 55;
  const [size, setSize] = useState({ width: 100, height: 100 }); // 画布尺寸
  const m = useRef(size); // 画布尺寸ref
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
    const l = (a - 2 * h) / x, // (888 - 2 * 55) / 1080
      o = (r.height - 2 * g) / k, // (614 - 2 * 55) / 1080
      c = Math.max(Math.min(l, o), 0.01);
    store.scaleToFit !== c && (store.setScale(c), store._setScaleToFit(c));
  };

  useLayoutEffect(() => {
    y({ skipTimeout: true });
  }, []);
  useEffect(() => {
    y();
  }, [x, k]);
  useEffect(() => {
    const container = containerRef.current;
    if (window.ResizeObserver) {
      const t = new ResizeObserver(() => {
        y({ skipTimeout: !0 });
      });
      t.observe(container);
      return () => t.unobserve(container);
    } else {
      const e = setInterval(() => {
        y({ skipTimeout: !0 });
      }, 100);
      return () => clearInterval(e);
    }
  }, [x, k]);

  const P = Math.max(h, (size.width - x * store.scale) / 2);
  const C = k * store.scale * store.pages.length;
  const M = Math.max(g, (size.height - C) / store.pages.length / 2);
  // useEffect keydown 键盘事件
  // useEffect wheel 滚动事件
  const T = useRef(!1);
  useSaveScrollOnScaleChange(innerRef, x * store.scale + 2 * P, k * store.scale + 2 * M, store.scale, store, T);
  const { handleScroll } = useScrollOnActiveChange(innerRef, k * store.scale + 2 * M, store, size, T);
  const S = size.width >= x * store.scale + 2 * P;
  const bgColor = backgroundColor || 'rgba(232, 232, 232, 0.9)';
  const O = store.pages.indexOf(store.activePage);
  const W = (null == components ? null : components.NoPages) || NoPages;
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
        backgroundColor: bgColor,
      }}
      tabIndex={0}
      className="tdesign-workspace-container"
    >
      <div
        ref={innerRef}
        onScroll={handleScroll}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'auto',
          overflowX: S ? 'hidden' : 'auto',
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
              pageBorderColor={pageBorderColor || 'lightgrey'}
              activePageBorderColor={activePageBorderColor || 'rgb(0, 161, 255)'}
              pageControlsEnabled={pageControlsEnabled}
              components={components}
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
        {0 === store.pages.length && <W store={store}></W>}
      </div>
    </div>
  );
};

export default observer(WorkspaceCanvas);
