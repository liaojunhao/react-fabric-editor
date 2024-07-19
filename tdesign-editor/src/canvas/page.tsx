import React, { useRef, useEffect } from 'react';
import { StoreType } from '../model/store';
import { PageType } from '../model/page-model';
import Handler from '../handlers/handler';
import { observer } from 'mobx-react-lite';
// import { Canvas } from 'react-fabricjs';
// console.log('Canvas', Canvas);
import { fabric } from 'fabric';

type PageProps = {
  store: StoreType;
  page: PageType;
  xPadding: number;
  yPadding: number;
  width: number;
  height: number;
  backColor: string;
  pageBorderColor: string;
  activePageBorderColor: string;
  pageControlsEnabled?: boolean;
  components: any;
};
const Page: React.FC<PageProps> = ({
  store,
  page,
  width,
  height,
  xPadding,
  yPadding,
  backColor,
  pageBorderColor,
  activePageBorderColor,
  pageControlsEnabled,
  components,
}) => {
  const u = store.bleedVisible ? page.bleed : 0;
  const m = page.computedWidth + 2 * u;
  const g = page.computedHeight + 2 * u;
  const h = (width - m * store.scale) / 2;
  const _ = (height - g * store.scale) / 2;

  const x = null == pageControlsEnabled || pageControlsEnabled;
  const canvasEl = useRef(null); // canvas
  const containerEl = useRef(null); // canvas父节点
  const handlerRef = useRef<fabric.Canvas>(null); // fabric的canvas实例
  const workarea = useRef<fabric.Rect>(null); // 每一页的画布对象
  const L = store.activePage === page;
  const O = null == components ? void 0 : components.PageControls;

  // 居中设置
  const setCenterFromObject = () => {
    const center = handlerRef.current.getCenter();
    handlerRef.current.setViewportTransform(fabric.iMatrix.concat());
    handlerRef.current.zoomToPoint(new fabric.Point(center.left, center.top), store.scale);
    const objCenter = workarea.current.getCenterPoint();
    const viewportTransform = handlerRef.current.viewportTransform;
    if (handlerRef.current.width === undefined || handlerRef.current.height === undefined || !viewportTransform) return;
    viewportTransform[4] = handlerRef.current.width / 2 - objCenter.x * viewportTransform[0];
    viewportTransform[5] = handlerRef.current.height / 2 - objCenter.y * viewportTransform[3];
    handlerRef.current.setViewportTransform(viewportTransform);
    handlerRef.current.renderAll();
  };

  useEffect(() => {
    handlerRef.current = new fabric.Canvas(canvasEl.current, {
      width: Math.min(width, 4 * window.innerWidth),
      height: Math.min(height, 4 * window.innerHeight),
      backgroundColor: backColor,
      preserveObjectStacking: true,
      perPixelTargetFind: true,
    });
  }, []);

  // 处理工作区域
  useEffect(() => {
    handlerRef.current.setWidth(width);
    handlerRef.current.setHeight(height);
    handlerRef.current.renderAll();
    if (!workarea.current) {
      const workareaObj = {
        id: 'workarea',
        left: 0,
        top: 0,
        width: page.computedWidth,
        height: page.computedHeight,
        fill: page.background,
        type: 'rect',
        hasBorders: false,
        hasControls: false,
        selectable: false,
        lockMovementX: true,
        lockMovementY: true,
        hoverCursor: 'default',
        originX: 'left',
        originY: 'top',
        stroke: L && store.pages.length > 1 ? activePageBorderColor : pageBorderColor,
        strokeWidth: 4,
      };
      workarea.current = new fabric.Rect(workareaObj);
      handlerRef.current.add(workarea.current);
      handlerRef.current.centerObject(workarea.current);
      setCenterFromObject();
    } else {
      workarea.current.set({
        width: page.computedWidth,
        height: page.computedHeight,
        fill: page.background,
        stroke: L && store.pages.length > 1 ? activePageBorderColor : pageBorderColor,
      });
      setCenterFromObject();
    }
  }, [store.activePage, width, height, store.scale]);

  return (
    <div
      ref={containerEl}
      className={`polotno-page-container ${L ? 'active-page' : ''}`}
      style={{ position: 'relative', width: width + 'px' }}
    >
      <canvas id={page.id} ref={canvasEl} />

      {x && L && O && <O store={store} page={page} xPadding={h} yPadding={_} />}
    </div>
  );
};

export default observer(Page);
