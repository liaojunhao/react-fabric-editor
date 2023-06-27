import { WorkareaHandler } from '.';
import { fabric } from 'fabric';
import * as defaults from '../constants';
import { WorkareaObject, WorkareaOption } from '../utils';

export interface HandlerCallback {
  onAdd?: () => void;
}
export interface HandlerOption {
  canvas?: fabric.Canvas;
  workareaOption?: WorkareaOption;
}

export type HandlerOptions = HandlerOption & HandlerCallback;

class Handler implements HandlerOptions {
  public canvas: fabric.Canvas;
  public workarea: WorkareaObject;
  public workareaOption? = defaults.workareaOption;

  public workareaHandler: WorkareaHandler;

  constructor(options: HandlerOptions) {
    this.initOption(options);
    this.initHandler();
  }

  public initOption = (options: HandlerOptions) => {
    this.canvas = options.canvas;
  };
  public initHandler = () => {
    // 初始化工作区模块
    this.workareaHandler = new WorkareaHandler(this);
  };
}

export default Handler;
