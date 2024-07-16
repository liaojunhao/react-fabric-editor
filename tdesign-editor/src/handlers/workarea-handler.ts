/**
 * 关于画布工作区的设置
 */
import Handler from './handler';
import { fabric } from 'fabric';

class WorkareaHandler {
  handler: Handler;
  workarea: fabric.Rect;
  constructor(handler: Handler) {
    this.handler = handler;
    // this.rect:fabric.Rect;
    this.addDefaultWorkarea();
  }

  public resize(width: number, height: number) {
    console.log(width, height);
    // this.handler.width = width;
    // this.handler.height = height;
    this.handler.canvas.setWidth(width);
    this.handler.canvas.setHeight(height);
    this.handler.canvas.centerObject(this.workarea);
    this.handler.canvas.renderAll();
  }

  // 添加标准工作区
  public addDefaultWorkarea() {
    const workarea = {
      id: 'workarea',
      left: 0,
      top: 0,
      width: 500,
      height: 500,
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
}

export default WorkareaHandler;
