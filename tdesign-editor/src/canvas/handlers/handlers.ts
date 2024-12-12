import { Canvas, FabricObject } from 'fabric';
import { PROPERTIES_TO_INCLUDE } from '../constants';

import { CanvasObjects } from './canvasObjects';

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
  public canvasElParent: HTMLDivElement;
  public canvas: Canvas;
  public backgroundColor: string;
  public _objects: FabricObject[] = [];
  set objects(val) {
    console.log('val ---> ', val);
    this._objects = val;
  }

  get objects() {
    return this._objects;
  }

  public workareaWidth: number;
  public workareaHeight: number;

  public workareaHandlers: WorkareaHandlers;
  public eventHandlers: EventHandlers;

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
    this.workareaWidth = workareaWidth || 600;
    this.workareaHeight = workareaHeight || 400;

    this.initHandler();
  }

  /**
   * 初始化所有控制模块
   */
  initHandler() {
    this.workareaHandlers = new WorkareaHandlers(this);
    this.eventHandlers = new EventHandlers(this);
  }

  /**
   * 添加元素
   * @param options
   * @param centered
   * @param loaded
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
