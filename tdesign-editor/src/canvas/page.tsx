import React, { useRef, useEffect } from 'react';
import { StoreType } from '../model/store';
import { PageType } from '../model/page-model';
// import { fabric } from 'fabric';
import Handler from '../handlers/handler';
import { observer } from 'mobx-react-lite';

type PageProps = {
  store: StoreType;
  page: PageType;
  xPadding: number;
  yPadding: number;
  width: number;
  height: number;
  backColor: string;
};
const Page: React.FC<PageProps> = ({ store, page, width, height, xPadding, yPadding, backColor }) => {
  const canvasEl = useRef(null);
  const container = useRef(null);
  const handlerRef = useRef<Handler>(null);
  const L = store.activePage === page;

  useEffect(() => {
    if (!handlerRef.current) {
      handlerRef.current = new Handler({
        canvasElParent: container.current,
        canvasEl: canvasEl.current,
        width: Math.min(width, 4 * window.innerWidth), // 这是个画布的大小
        height: Math.min(height, 4 * window.innerHeight), // 这是个画布的大小
        backColor: backColor,
        workerWidth: store.width,
        workerHeight: store.height,
      });
      page.set({
        custom: handlerRef.current,
      });
    }
  }, []);
  useEffect(() => {
    // 适配画布
    handlerRef.current.workareaHandler.auto(width, height, store.scale, (left, top) => {
      console.log(left, top);
    });
  }, [width, height, store.activePage, store.scale]);

  return (
    <div
      ref={container}
      className={`polotno-page-container ${L ? 'active-page' : ''}`}
      style={{ position: 'relative', width: width + 'px' }}
    >
      <canvas ref={canvasEl} />
    </div>
  );
};

export default observer(Page);
