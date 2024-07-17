/**
 * 关于画布工作区的设置
 */
import Handler from './handler';
import { fabric } from 'fabric';

class WorkareaHandler {
  handler: Handler;
  workarea: fabric.Rect;
  zoomRatio: number = 1;
  public canvasElParent: HTMLDivElement;
  public workerWidth: number = 1080;
  public workerHeight: number = 1080;

  constructor(handler: Handler, options) {
    this.handler = handler;
    this.canvasElParent = options.canvasElParent;
    this.addDefaultWorkarea(options);
  }

  // 添加标准工作区
  public addDefaultWorkarea(options) {
    const { page } = options;
    const workarea = {
      id: 'workarea',
      left: 0,
      top: 0,
      width: page.width || this.workerWidth,
      height: page.height || this.workerHeight,
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
      stroke: page.stroke,
      strokeWidth: 4,
    };
    this.workarea = new fabric.Rect(workarea);
    this.handler.canvas.add(this.workarea);
    this.handler.canvas.centerObject(this.workarea);
    this.handler.canvas.renderAll();
  }

  /**
   * 设置画布中心到指定对象中心点上
   * @param {Object} obj 指定的对象
   */
  setCenterFromObject(obj: fabric.Rect) {
    const { canvas } = this.handler;
    const objCenter = obj.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;
    if (canvas.width === undefined || canvas.height === undefined || !viewportTransform) return;
    viewportTransform[4] = canvas.width / 2 - objCenter.x * viewportTransform[0];
    viewportTransform[5] = canvas.height / 2 - objCenter.y * viewportTransform[3];
    canvas.setViewportTransform(viewportTransform);
    canvas.renderAll();
  }

  auto(width: number, height: number, scale) {
    this.handler.canvas.setWidth(width);
    this.handler.canvas.setHeight(height);
    const center = this.handler.canvas.getCenter();
    this.handler.canvas.setViewportTransform(fabric.iMatrix.concat());
    this.handler.canvas.zoomToPoint(new fabric.Point(center.left, center.top), scale);
    if (!this.workarea) return;
    this.setCenterFromObject(this.workarea);

    // 超出画布不展示
    this.workarea.clone((cloned: fabric.Rect) => {
      this.handler.canvas.clipPath = cloned;
      this.handler.canvas.requestRenderAll();
    });
  }
  set(option) {
    console.log('option', option);
    // this.workarea.stroke = option.stroke;
    this.workarea.set({
      stroke: option.stroke,
    });
    console.log(this.workarea);
    this.handler.canvas.renderAll();
  }
}

export default WorkareaHandler;
