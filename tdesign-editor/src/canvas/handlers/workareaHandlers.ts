import Handlers from './handlers';
import { Rect, iMatrix, Point, util } from 'fabric';
import { throttle } from 'lodash-es';
import { SelectEvent } from '../utils/types';
class WorkareaHandlers {
  public workarea: Rect;
  public zoomRatio: number = 0.85;
  public option: { width: number; height: number };

  private workareaEl: HTMLDivElement;
  private resizeObserver: ResizeObserver;
  constructor(private handlers: Handlers) {
    this._init({
      width: this.handlers.workareaOption.width,
      height: this.handlers.workareaOption.height,
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

  /**
   * 钩子函数 TODO：需要改造
   * @returns
   */
  hookImportAfter() {
    return new Promise((resolve) => {
      //@ts-expect-error
      const workspace = this.handlers.canvas.getObjects().find((item) => item.id === 'workarea');
      if (workspace) {
        workspace.set('selectable', false);
        workspace.set('hasControls', false);
        workspace.set('evented', false);
        if (workspace.width && workspace.height) {
          this.setSize(workspace.width, workspace.height);
          // this.editor.emit('sizeChange', workspace.width, workspace.height);
        }
      }
      resolve('');
    });
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
      name: 'workarea',
    });
    workarea.set('selectable', false);
    workarea.set('hasControls', false);
    workarea.hoverCursor = 'default';
    this.handlers.canvas.add(workarea);
    this.handlers.canvas.renderAll();

    this.workarea = workarea;

    this.auto();

    // 初始化画布（只做一次）
    setTimeout(() => {
      this.handlers.event.emit(SelectEvent.UPDATA, Math.random());
    });
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
    return util.findScaleToFit(this.getWorkspase(), {
      width: this.workareaEl.offsetWidth,
      height: this.workareaEl.offsetHeight,
    });
  }

  /**
   * 设置工作区域的大小（需要改造）
   * @param width
   * @param height
   */
  setSize(width: number, height: number) {
    this._initBackground();
    this.option.width = width;
    this.option.height = height;
    // 重新设置workspace
    this.workarea = this.getWorkspase();
    this.workarea.set('width', width);
    this.workarea.set('height', height);
    this.handlers.workareaOption.width = width;
    this.handlers.workareaOption.width = height;
    // this.editor.emit('sizeChange', this.workarea.width, this.workarea.height);
    this.auto();
    // todo:其他元素也要修改位置
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

  getWorkspase() {
    //@ts-expect-error
    return this.handlers.canvas.getObjects().find((item) => item.id === 'workarea') as Rect;
  }

  setWorkspaseBg(color: string) {
    const workspase = this.getWorkspase();
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
