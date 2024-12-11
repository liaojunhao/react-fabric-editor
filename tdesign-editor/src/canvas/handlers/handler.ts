import { Canvas } from 'fabric';

import WorkareaHandler from './workarea';

interface HandlerOption {
  canvasElParent: HTMLDivElement;
  canvasEl: HTMLCanvasElement;
  workareaWidth?: number;
  workareaHeight?: number;
  backgroundColor?: string;
}

class Handler {
  private workareaHandler: WorkareaHandler;
  private canvas: Canvas;
  get fabricCanvas() {
    return this.canvas;
  }
  constructor(private option: HandlerOption) {
    const { backgroundColor, canvasEl, canvasElParent } = this.option;
    const canvas = new Canvas(canvasEl, {
      backgroundColor: backgroundColor || 'rgba(232, 232, 232, 0.9)',
      height: canvasElParent.clientHeight,
      width: canvasElParent.clientWidth,
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: true, // 禁止默认右键菜单
      controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
      preserveObjectStacking: true, // 当选择画布中的对象时，让对象不在顶层。
    });
    this.canvas = canvas;
    this.initHandler();
  }
  initHandler() {
    // 初始化一些内容
    this.workareaHandler = new WorkareaHandler(this);
  }
}

export default Handler;
