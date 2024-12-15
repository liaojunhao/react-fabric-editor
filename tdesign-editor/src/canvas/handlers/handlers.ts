import { Canvas, FabricObject } from 'fabric';
import { PROPERTIES_TO_INCLUDE } from '../constants';
import { CanvasObjects } from '../utils/objects';
import CanvasEventEmitter from '../utils/notifier';
import EventHandlers from './eventHandlers';
import WorkareaHandlers from './workareaHandlers';
import PsdHandlers from './psdHandlers';
import { nanoid } from 'nanoid';
import { SelectEvent } from '../utils/types';

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

  public event: CanvasEventEmitter;
  public workareaHandlers: WorkareaHandlers;
  public eventHandlers: EventHandlers;
  public psdHandlers: PsdHandlers;

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

    this._initHandler();
  }

  /**
   * 初始化所有控制模块
   */
  private _initHandler() {
    this.event = new CanvasEventEmitter(this); // 他需要在第一位

    this.workareaHandlers = new WorkareaHandlers(this);
    this.eventHandlers = new EventHandlers(this);
    this.psdHandlers = new PsdHandlers(this);
  }

  private _addObjects(object) {
    this.objects.push(object.toObject(this.propertiesToInclude));
    this.event.emit(SelectEvent.CHANGE, this.objects);
  }

  /**
   * 添加元素
   * @param options
   * @param centered
   */
  addElement(options: { id: string; name: string; type: string }, { skipSelect = false, centered = true }) {
    const { type, ...textOptions } = options;
    const element = CanvasObjects[type].render(textOptions);
    this.canvas.add(element);

    if (centered) {
      const center = this.workareaHandlers.workarea.getCenterPoint();
      this.canvas._centerObject(element, center);
    }

    if (!skipSelect) {
      this.canvas.setActiveObject(element);
    }

    this.canvas.renderAll();

    this._addObjects(element);
    return element;
  }

  /**
   * 设置元素属性
   * @param target
   * @param options
   */
  setElement(target: FabricObject, options) {
    Object.keys(options).forEach((property) => {
      const value = options[property];
      target.set(property, value);
      target.setCoords();
      this.canvas.requestRenderAll();
      // 画布改完了去刷新UI要更新
      this.event.emit(SelectEvent.UPDATA, Math.random());
    });
  }

  /**
   * 加载JSON
   */
  async importJSON(jsonFile: string | object, callback?: () => void) {
    const temp = typeof jsonFile === 'string' ? JSON.parse(jsonFile) : jsonFile;

    const textPaths: Record<'id' | 'path', any>[] = [];
    temp.objects.forEach((item: any) => {
      !item.id && (item.id = nanoid());
      // 收集所有路径文本元素i-text，并设置path为null
      if (item.type === 'i-text' && item.path) {
        textPaths.push({ id: item.id, path: item.path });
        item.path = null;
      }
    });

    jsonFile = JSON.stringify(temp);

    // TODO：需要改造
    this.canvas.loadFromJSON(jsonFile, () => {
      this.canvas.renderAll();
      // 这里必须要异步，不然获取的画布对象不是最新额度
      setTimeout(() => {
        this.workareaHandlers.hookImportAfter().then(() => {
          this.canvas.renderAll();
          callback && callback();
        });
      });
    });
  }
}

export default Handlers;
