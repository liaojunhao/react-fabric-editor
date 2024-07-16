import React, { useRef, useEffect } from 'react';
import { StoreType } from '../model/store';
import { PageType } from '../model/page-model';
// import { fabric } from 'fabric';
import Handler from '../handlers/handler';

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
  const handlerRef = useRef(null);

  const L = store.activePage === page;
  useEffect(() => {
    if (!handlerRef.current) {
      handlerRef.current = new Handler({
        canvasElParent: container.current,
        canvasEl: canvasEl.current,
        width: Math.min(width, 4 * window.innerWidth),
        height: Math.min(height, 4 * window.innerHeight),
        backColor: backColor,
      });

      page.set({
        custom: handlerRef.current,
      });
    } else {
      // handlerRef.current
      // handlerRef.current.canvas.setWidth(width);
      // handlerRef.current.canvas.setHeight(height);
      // handlerRef.current.canvas.renderAll();
      handlerRef.current.workareaHandler.resize(width, height);
    }
  }, [width, height]);

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

export default Page;
