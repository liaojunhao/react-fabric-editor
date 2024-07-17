/**
 * 关于画布工作区的设置
 */
import Handler from './handler';
import { fabric } from 'fabric';

class WorkareaHandler {
  handler: Handler;
  workarea: fabric.Rect;
  zoomRatio: number = 1;
  constructor(handler: Handler) {
    this.handler = handler;
    this.addDefaultWorkarea();
  }

  // 添加标准工作区
  public addDefaultWorkarea() {
    const workarea = {
      id: 'workarea',
      left: 0,
      top: 0,
      width: this.handler.workerWidth,
      height: this.handler.workerHeight,
      fill: '#fff',
      type: 'rect',
      hasBorders: false,
      hasControls: false,
      selectable: false,
      lockMovementX: true,
      lockMovementY: true,
      hoverCursor: 'default',
      originX: 'left',
      originY: 'top',
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

  auto(width: number, height: number, scale, cb?: (left?: number, top?: number) => void) {
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

    if (cb) cb(this.workarea.left, this.workarea.top);
  }
}

export default WorkareaHandler;
