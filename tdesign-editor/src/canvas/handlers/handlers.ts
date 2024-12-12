import { Canvas, FabricObject } from 'fabric';
import { PROPERTIES_TO_INCLUDE } from '../constants';

import { CanvasObjects } from './canvasObjects';

import EventHandlers from './eventHandlers';
import WorkareaHandlers from './workareaHandlers';
import CanvasEventEmitter from '../utils/notifier';

interface HandlerOption {
  canvasElParent: HTMLDivElement;
  canvasEl: HTMLCanvasElement;
  workareaWidth?: number;
  workareaHeight?: number;
  backgroundColor?: string;
}

class Handlers {
  // 一些私有属性
  private _propertiesToInclude = PROPERTIES_TO_INCLUDE;
  get propertiesToInclude() {
    return this._propertiesToInclude;
  }
  public canvasElParent: HTMLDivElement;
  public canvas: Canvas;
  public backgroundColor: string;
  public objects: FabricObject[] = [];
  public workareaOption: { width: number; height: number };

  // 一些控制模块
  public workareaHandlers: WorkareaHandlers;
  public eventHandlers: EventHandlers;
  public event: CanvasEventEmitter;

  constructor(private option: HandlerOption) {
    const { backgroundColor, canvasEl, canvasElParent, workareaHeight, workareaWidth } = this.option;
    this.backgroundColor = backgroundColor || 'rgba(232, 232, 232, 0.9)';
    const canvas = new Canvas(canvasEl, {
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: true, // 禁止默认右键菜单
      controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
      preserveObjectStacking: true, // 当选择画布中的对象时，让对象不在顶层。
    });
    this.canvasElParent = canvasElParent;
    this.canvas = canvas;
    this.workareaOption = {
      width: workareaWidth || 600,
      height: workareaHeight || 400,
    };

    this.initHandler();
  }

  /**
   * 初始化所有控制模块
   */
  initHandler() {
    this.event = new CanvasEventEmitter(this); // 他需要在第一位
    this.workareaHandlers = new WorkareaHandlers(this);
    this.eventHandlers = new EventHandlers(this);
  }

  /**
   * 添加元素
   * @param options
   * @param centered
   */
  addObject(options, { skipSelect = false, centered = true }) {
    const { type, ...textOptions } = options;
    const element = CanvasObjects[type].render(textOptions);
    this.canvas.add(element);
    this.objects.push(element);

    if (centered) {
      const center = this.workareaHandlers.workarea.getCenterPoint();
      this.canvas._centerObject(element, center);
    }

    if (!skipSelect) {
      this.canvas.setActiveObject(element);
    }

    this.canvas.renderAll();
    return element;
  }
}

export default Handlers;
