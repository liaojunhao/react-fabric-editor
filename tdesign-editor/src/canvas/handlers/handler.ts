import { Canvas } from 'fabric';

import WorkareaHandler from './workarea';

class Handler {
  private workareaHandler: WorkareaHandler; // 工作区域

  get fabricCanvas() {
    return this.canvas;
  }

  constructor(private canvas: Canvas) {
    // 初始化一些内容
    this.workareaHandler = new WorkareaHandler(this);
  }
}

export default Handler;
