import Handler from './handler';
import { Rect } from 'fabric';

class WorkareaHandler {
  constructor(private handler: Handler) {
    const workarea = new Rect({
      id: 'workarea',
      width: 600,
      height: 400,
      absolutePositioned: true,
      fill: '#ffffff',
      selectable: false,
      hoverCursor: 'default',
    });
    this.handler.fabricCanvas.add(workarea);
    this.handler.fabricCanvas.centerObject(workarea);
  }
}

export default WorkareaHandler;
