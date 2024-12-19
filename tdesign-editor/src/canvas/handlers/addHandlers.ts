import Handlers from './handlers';
import { fabric } from 'fabric';
import { nanoid } from 'nanoid';
class AddHandlers {
  constructor(private handlers: Handlers) {}
  addBaseType(
    item: fabric.Object,
    optons?: {
      event?: DragEvent;
      scale?: boolean;
      centered?: boolean;
      skipSelect?: boolean;
    },
  ) {
    const { event = false, scale = false, centered = true, skipSelect } = optons || {};
    item.set({
      id: nanoid(),
    });
    scale && this._toScale(item);
    event && this._toEvent(item, event);
    this.handlers.canvas.add(item);
    if (!event && centered) {
      this._toCenter(item);
    }
    if (!skipSelect) {
      this.handlers.canvas.setActiveObject(item);
    }
    this.handlers.canvas.renderAll();
  }

  _toScale(item: fabric.Object) {
    const { width } = this.handlers.workareaHandlers.getWorkspase();
    if (width === undefined) return;
    item.scaleToWidth(width / 2);
  }

  _toEvent(item: fabric.Object, event: DragEvent) {}

  _toCenter(item: fabric.Object) {
    const defaultWorkspace = this.handlers.workareaHandlers.getWorkspase();
    const center = defaultWorkspace.getCenterPoint();
    this.handlers.canvas._centerObject(item, center);
  }
}

export default AddHandlers;
