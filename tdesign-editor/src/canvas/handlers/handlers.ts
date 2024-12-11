import { Canvas, FabricObject } from 'fabric';
import { PROPERTIES_TO_INCLUDE } from '../constants';

import EventHandlers from './eventHandlers';
import WorkareaHandlers from './workareaHandlers';

interface HandlerOption {
  canvasElParent: HTMLDivElement;
  canvasEl: HTMLCanvasElement;
  workareaWidth?: number;
  workareaHeight?: number;
  backgroundColor?: string;
}

class Handlers {
  private _propertiesToInclude = PROPERTIES_TO_INCLUDE;
  get propertiesToInclude() {
    return this._propertiesToInclude;
  }

  public canvas: Canvas;
  public objects: FabricObject[] = [];
  public workareaWidth = 600;
  public workareaHeight = 500;

  public workareaHandler: WorkareaHandlers;
  public eventHandlers: EventHandlers;

  constructor(private option: HandlerOption) {
    const { backgroundColor, canvasEl, canvasElParent, workareaHeight, workareaWidth } = this.option;
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
    this.workareaWidth = workareaWidth || this.workareaWidth;
    this.workareaHeight = workareaHeight || this.workareaHeight;

    this.initHandler();
  }

  /**
   * 初始化所有控制模块
   */
  initHandler() {
    this.workareaHandler = new WorkareaHandlers(this);
    this.eventHandlers = new EventHandlers(this);
  }
}

export default Handlers;
