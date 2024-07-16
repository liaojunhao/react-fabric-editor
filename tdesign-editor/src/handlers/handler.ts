import { fabric } from 'fabric';

class Handler {
  public canvas: fabric.Canvas;
  constructor(options) {
    this.initOptions(options);
  }
  initOptions(options) {
    const defaultSize = 500;
    this.canvas = new fabric.Canvas(options.canvasEl, {
      width: options.width || defaultSize,
      height: options.height || defaultSize,
      backgroundColor: options.backColor,
      preserveObjectStacking: true,
      perPixelTargetFind: true,
    });
  }
}

export default Handler;
