import { fabric } from 'fabric';
import WorkareaHandler from './workarea-handler';

class Handler {
  public canvas: fabric.Canvas;
  public workareaHandler: WorkareaHandler;

  public width: number = 500;
  public height: number = 500;
  public workerWidth: number = 1080;
  public workerHeight: number = 1080;

  constructor(options) {
    this.initOptions(options);
    this.initHandler();
  }
  // 初始化一些基础参数
  private initOptions(options) {
    this.width = options.width;
    this.height = options.height;

    // 初始化工作区域大小
    this.workerWidth = options.workerWidth;
    this.workerHeight = options.workerHeight;

    this.canvas = new fabric.Canvas(options.canvasEl, {
      width: this.width,
      height: this.height,
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
