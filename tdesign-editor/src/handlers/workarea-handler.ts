/**
 * 关于画布工作区的设置
 */
import Handler from './handler';
import { fabric } from 'fabric';

class WorkareaHandler {
  handler: Handler;
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
    const rect = new fabric.Rect(workarea);
    this.handler.canvas.add(rect);
    this.handler.canvas.centerObject(rect);
    this.handler.canvas.renderAll();
  }
}

export default WorkareaHandler;
