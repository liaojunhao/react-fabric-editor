import Handlers from './handlers';
import { Rect } from 'fabric';

class WorkareaHandlers {
  public workarea: Rect;
  constructor(private handlers: Handlers) {
    const workarea = new Rect({
      id: 'workarea',
      width: this.handlers.workareaWidth,
      height: this.handlers.workareaHeight,
      // absolutePositioned: true,
      fill: '#ffffff',
      selectable: false,
      hoverCursor: 'default',
      hasControls: false,
      strokeWidth: 0,
    });
    this.workarea = workarea;
    this.handlers.canvas.add(workarea);
    this.handlers.canvas.centerObject(workarea);
    this.handlers.objects.push(this.workarea);
  }

  abd() {}
}

export default WorkareaHandlers;
