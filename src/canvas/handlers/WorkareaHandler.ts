import { Handler } from '.';
import { fabric } from 'fabric';
import { throttle } from 'lodash-es';
import { WorkareaObject } from '../utils';

declare type EditorWorkspaceOption = { width: number; height: number };

class WorkareaHandler {
  canvas: fabric.Canvas;
  handler: Handler;
  workspaceEl: HTMLElement; // 画布区域
  workspace: fabric.Rect | null; // 模板区域
  dragMode: boolean;

  option: EditorWorkspaceOption;

  constructor(handler: Handler) {
    this.handler = handler;
    const { workareaOption, canvas } = this.handler;

    this.canvas = canvas;
    this.option = {
      width: workareaOption.width,
      height: workareaOption.height
    };

    const workspaceEl = document.querySelector('#workspace') as HTMLElement;
    if (!workspaceEl) {
      throw new Error('element #workspace is missing, plz check!');
    }
    this.workspaceEl = workspaceEl;
    this.workspace = null;
    this.dragMode = false;

    this._initBackground();
    this._initWorkspace();
    this._initResizeObserve();
  }

  // 初始化模板
  _initWorkspace() {
    const { workareaOption } = this.handler;
    const image = new Image(workareaOption.width, workareaOption.height);
    image.width = workareaOption.width;
    image.height = workareaOption.height;
    this.handler.workarea = new fabric.Image(
      image,
      workareaOption
    ) as WorkareaObject;
    this.handler.canvas.add(this.handler.workarea);
    // this.handler.objects = this.handler.getObjects();
    this.handler.canvas.centerObject(this.handler.workarea);
    this.handler.canvas.renderAll();
  }
  // 初始化画布
  _initBackground() {
    this.canvas.setBackgroundColor(
      '#F1F1F1',
      this.canvas.renderAll.bind(this.canvas)
    );
    this.canvas.backgroundImage = '';
    this.canvas.setWidth(this.workspaceEl.offsetWidth);
    this.canvas.setHeight(this.workspaceEl.offsetHeight);
  }

  // 初始化监听器
  _initResizeObserve() {
    const resizeObserver = new ResizeObserver(
      throttle(() => {
        this.auto();
      }, 50)
    );
    resizeObserver.observe(this.workspaceEl);
  }

  // 自动缩放
  auto() {
    const scale = this._getScale();
    this.setZoomAuto(scale - 0.08);
  }

  _getScale() {
    const viewPortWidth = this.workspaceEl.offsetWidth;
    const viewPortHeight = this.workspaceEl.offsetHeight;

    // 按照宽度
    if (
      viewPortWidth / viewPortHeight <
      this.option.width / this.option.height
    ) {
      return viewPortWidth / this.option.width;
    } // 按照宽度缩放
    return viewPortHeight / this.option.height;
  }

  setZoomAuto(scale: number, cb?: (left?: number, top?: number) => void) {
    const { workspaceEl } = this;
    const width = workspaceEl.offsetWidth;
    const height = workspaceEl.offsetHeight;
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
    const center = this.canvas.getCenter();
    this.canvas.setViewportTransform(fabric.iMatrix.concat());
    this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), scale);

    if (!this.workspace) return;
    this.setCenterFromObject(this.workspace);

    // 超出画布不展示
    this.workspace.clone((cloned: fabric.Rect) => {
      this.canvas.clipPath = cloned;
      this.canvas.requestRenderAll();
    });
    if (cb) cb(this.workspace.left, this.workspace.top);
  }

  /**
   * 设置画布中心到指定对象中心点上
   * @param {Object} obj 指定的对象
   */
  setCenterFromObject(obj: fabric.Rect) {
    const { canvas } = this;
    const objCenter = obj.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;
    if (
      canvas.width === undefined ||
      canvas.height === undefined ||
      !viewportTransform
    )
      return;
    viewportTransform[4] =
      canvas.width / 2 - objCenter.x * viewportTransform[0];
    viewportTransform[5] =
      canvas.height / 2 - objCenter.y * viewportTransform[3];
    canvas.setViewportTransform(viewportTransform);
    canvas.renderAll();
  }
}

export default WorkareaHandler;
