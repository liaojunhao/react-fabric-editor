import EventEmitter from 'events';
import Handlers from '../handlers';
import { fabric } from 'fabric';
import { SelectEvent } from './types';

/**
 * 这是一个特殊的类，主要是做发布订阅
 */
class CanvasEventEmitter extends EventEmitter {
  canvas: fabric.Canvas;
  constructor(private handlers: Handlers) {
    super();
    this._init(this.handlers.canvas);
  }

  private _init(canvas: fabric.Canvas) {
    this.canvas = canvas;
    this.canvas.on('selection:created', () => this.selected());
    this.canvas.on('selection:updated', () => this.selected());
    this.canvas.on('selection:cleared', () => this.selected());
  }

  private selected() {
    const actives = this.canvas.getActiveObjects();
    if (actives && actives.length === 1) {
      this.emit(SelectEvent.ONE, actives);
    } else if (actives && actives.length > 1) {
      this.emit(SelectEvent.MULTI, actives);
    } else {
      this.emit(SelectEvent.CANCEL, []);
    }
  }
}

export default CanvasEventEmitter;
