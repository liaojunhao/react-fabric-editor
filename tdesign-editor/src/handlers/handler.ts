import { fabric } from 'fabric';
import WorkareaHandler from './workarea-handler';

class Handler {
  public canvas: fabric.Canvas;
  public workareaHandler: WorkareaHandler;

  public width: number = 500;
  public height: number = 500;

  constructor(options) {
    this.initOptions(options);
    this.initHandler();
  }
  // 初始化一些基础参数
  private initOptions(options) {
    const defaultSize = 500;
    this.width = options.width;
    this.height = options.height;
    this.canvas = new fabric.Canvas(options.canvasEl, {
      width: options.width || defaultSize,
      height: options.height || defaultSize,
      backgroundColor: options.backColor,
      preserveObjectStacking: true,
      perPixelTargetFind: true,
    });
  }

  // 初始化各种处理
  private initHandler() {
    this.workareaHandler = new WorkareaHandler(this);
  }
}

export default Handler;
