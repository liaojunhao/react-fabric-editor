import { fabric } from 'fabric';
import WorkareaHandler from './workarea-handler';

class Handler {
  public canvas: fabric.Canvas;
  public workareaHandler: WorkareaHandler;

  public width: number = 500;
  public height: number = 500;

  constructor(options) {
    this.initOptions(options);
    this.initHandler(options);
  }
  // 初始化一些基础参数
  private initOptions(options) {
    this.width = options.width;
    this.height = options.height;

    this.canvas = new fabric.Canvas(options.canvasEl, {
      width: this.width,
      height: this.height,
      backgroundColor: options.backColor,
      preserveObjectStacking: true,
      perPixelTargetFind: true,
    });
  }

  // 初始化各种处理
  private initHandler(options) {
    this.workareaHandler = new WorkareaHandler(this, options);
  }

  public resize(width: number, height: number) {
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
  }
}

export default Handler;
