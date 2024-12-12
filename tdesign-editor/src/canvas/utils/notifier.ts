import EventEmitter from 'events';
import Handlers from '../handlers';
import { Canvas } from 'fabric';
import { SelectEvent } from './types';

class CanvasEventEmitter extends EventEmitter {
  canvas: Canvas;
  constructor(private handlers: Handlers) {
    super();
    this._init(this.handlers.canvas);
  }

  private _init(canvas: Canvas) {
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
