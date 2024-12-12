import Handlers from './handlers';
import { Rect, iMatrix, Point, util } from 'fabric';
import { throttle } from 'lodash-es';
class WorkareaHandlers {
  public workarea: Rect;
  public zoomRatio: number = 0.85;
  public option: { width: number; height: number };

  private workareaEl: HTMLDivElement;
  private resizeObserver: ResizeObserver;
  constructor(private handlers: Handlers) {
    this._init({
      width: this.handlers.workareaWidth,
      height: this.handlers.workareaHeight,
    });
  }

  private _init(option: { width: number; height: number }) {
    const workareaEl = this.handlers.canvasElParent;
    if (!workareaEl) {
      throw new Error('element #workspace is missing, plz check!');
    }
    this.workareaEl = workareaEl;
    this.option = option;
    this._initBackground();
    this._initWorkarea();
    this._initResizeObserve();
    this._bindWheel();
  }
  // 初始化整个画布
  private _initBackground() {
    this.handlers.canvas.setWidth(this.workareaEl.offsetWidth);
    this.handlers.canvas.setHeight(this.workareaEl.offsetHeight);
  }
  // 初始化工作区
  private _initWorkarea() {
    const { width, height } = this.option;
    const workarea = new Rect({
      fill: 'rgba(255,255,255,1)',
      width,
      height,
      id: 'workarea',
      strokeWidth: 0,
    });
    workarea.set('selectable', false);
    workarea.set('hasControls', false);
    workarea.hoverCursor = 'default';
    this.handlers.canvas.add(workarea);
    this.handlers.canvas.renderAll();

    this.workarea = workarea;

    this.auto();
  }
  // 监听窗口的变化
  private _initResizeObserve() {
    const resizeObserver = new ResizeObserver(
      throttle(() => {
        this.auto();
      }, 50),
    );
    this.resizeObserver = resizeObserver;
    this.resizeObserver.observe(this.workareaEl);
  }

  // 滑动事件
  private _bindWheel() {
    this.handlers.canvas.on('mouse:wheel', (opt) => {
      const canvas = this.handlers.canvas;

      const delta = opt.e.deltaY;
      let zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 10) zoom = 10;
      if (zoom < 0.1) zoom = 0.1;
      const center = canvas.getCenter();
      canvas.zoomToPoint(new Point(center.left, center.top), zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  }

  private _getScale() {
    return util.findScaleToFit(this.workarea, {
      width: this.workareaEl.offsetWidth,
      height: this.workareaEl.offsetHeight,
    });
  }

  setSize(width: number, height: number) {
    this._initBackground();
    this.option.width = width;
    this.option.height = height;
    // this.handlers.workareaWidth = width;
    // this.handlers.workareaHeight = height;
    this.workarea.set('width', width);
    this.workarea.set('height', height);
    // this.editor.emit('sizeChange', this.workspace.width, this.workspace.height);
    this.auto();
  }

  auto() {
    const scale = this._getScale();
    this.setZoomAuto(scale * this.zoomRatio);
  }

  /**
   * 设置画布中心到指定对象中心点上
   * @param {Object} obj 指定的对象
   */
  setCenterFromObject(obj: Rect) {
    const { canvas } = this.handlers;
    const objCenter = obj.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;
    if (canvas.width === undefined || canvas.height === undefined || !viewportTransform) return;
    viewportTransform[4] = canvas.width / 2 - objCenter.x * viewportTransform[0];
    viewportTransform[5] = canvas.height / 2 - objCenter.y * viewportTransform[3];
    canvas.setViewportTransform(viewportTransform);
    canvas.renderAll();
  }

  setZoomAuto(scale: number, cb?: (left?: number, top?: number) => void) {
    const { workareaEl } = this;
    const width = workareaEl.offsetWidth;
    const height = workareaEl.offsetHeight;
    this.handlers.canvas.setWidth(width);
    this.handlers.canvas.setHeight(height);
    const center = this.handlers.canvas.getCenter();
    this.handlers.canvas.setViewportTransform(iMatrix);
    this.handlers.canvas.zoomToPoint(new Point(center.left, center.top), scale);
    if (!this.workarea) return;
    this.setCenterFromObject(this.workarea);

    // 超出画布不展示;
    this.workarea
      .clone()
      .then((cloned: Rect) => {
        this.handlers.canvas.clipPath = cloned;
        this.handlers.canvas.requestRenderAll();
        if (cb) cb(this.workarea.left, this.workarea.top);
      })
      .catch((e) => {
        console.error('clone error', e);
      });
  }

  // 好像暂时不需要这样查找
  // getWorkspase() {
  //   //@ts-expect-error
  //   return this.handlers.canvas.getObjects().find((item) => item.id === 'workarea');
  // }

  setWorkspaseBg(color: string) {
    const workspase = this.workarea;
    workspase?.set('fill', color);
    this.handlers.canvas.renderAll();
  }

  destroy() {
    this.resizeObserver.disconnect();
    this.handlers.canvas.off();
    console.log('destroy');
  }
}

export default WorkareaHandlers;
