import { fabric } from 'fabric';
import { PROPERTIES_TO_INCLUDE } from '../constants';
import { CanvasObjects } from '../utils/objects';
import CanvasEventEmitter from '../utils/notifier';
import { nanoid } from 'nanoid';
import { SelectEvent } from '../utils/types';

import EventHandlers from './eventHandlers';
import WorkareaHandlers from './workareaHandlers';
import PsdHandlers from './psdHandlers';
import FilterHandlers from './filterHandlers';
import EffectHandlers from './effectHandlers';
import GuidelineHandlers from './guidelineHandlers';
import AddHandlers from './addHandlers';

// 初始化配置
const initConf = () => {
  // 这里对是提高一些滤镜效果处理的乏值，他默认是2048有些大图就忽略处理了
  // fabric.textureSize = 2048 * 5;

  fabric.Object.prototype.set({
    transparentCorners: false,
    borderColor: '#215db0',
    cornerColor: '#FFF',
    borderScaleFactor: 2.5,
    cornerStyle: 'circle',
    cornerStrokeColor: '#215db0',
    borderOpacityWhenMoving: 1,
  });
};

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
  public canvas: fabric.Canvas;
  public backgroundColor: string;
  public workareaOption: { width: number; height: number };

  public event: CanvasEventEmitter;
  public workareaHandlers: WorkareaHandlers;
  public eventHandlers: EventHandlers;
  public psdHandlers: PsdHandlers;
  public filterHandlers: FilterHandlers;
  public effectHandlers: EffectHandlers;
  public guidelineHandlers: GuidelineHandlers;
  public addHandlers: AddHandlers;

  constructor(private option: HandlerOption) {
    const { backgroundColor, canvasEl, canvasElParent, workareaHeight, workareaWidth } = this.option;
    this.backgroundColor = backgroundColor || 'rgba(232, 232, 232, 0.9)';

    initConf();

    const canvas = new fabric.Canvas(canvasEl, {
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
    this.event = new CanvasEventEmitter(this);
    this.workareaHandlers = new WorkareaHandlers(this);
    this.eventHandlers = new EventHandlers(this);
    this.psdHandlers = new PsdHandlers(this);
    this.filterHandlers = new FilterHandlers(this);
    this.effectHandlers = new EffectHandlers(this);
    this.guidelineHandlers = new GuidelineHandlers(this);
    this.addHandlers = new AddHandlers(this);
  }

  /**
   * 添加元素
   * @param options
   * @param centered
   */
  async addElement(
    options: { id: string; name: string; type: string },
    { skipSelect = false, scale = false, centered = true },
  ) {
    const { type, ...textOptions } = options;
    const element = await CanvasObjects[type].render(textOptions, this);
    if (element) {
      this.addHandlers.addBaseType(element, { skipSelect, scale, centered });
      this.event.emit(SelectEvent.UPDATA, Math.random());
      return element;
    }
  }

  /**
   * 设置元素属性
   *  - 文字的：描边、阴影、
   *  - 图片的：模糊、高度、褐调、灰度
   *  - 其他的属性设置等
   * @param target
   * @param options
   */
  setElement(target, options) {
    Object.keys(options).forEach((property) => {
      const value = options[property];

      switch (property) {
        // 图片圆角
        case 'cornerRadius':
          target.set(property, value);
          this.effectHandlers.setImageBorderRadius(value);
          break;
        // 灰度
        case 'grayscaleEnabled':
          target.set(property, value);
          this.filterHandlers.changeFiltersByParams('grayscale', value);
          break;
        // 褐调
        case 'sepiaEnabled':
          target.set(property, value);
          this.filterHandlers.changeFilters('sepia', value);
          break;
        // 亮度
        case 'brightnessEnabled':
          target.set(property, value);
          this.filterHandlers.changeFiltersByParams('brightness', value);
          break;
        case 'brightness':
          target.set(property, value);
          this.filterHandlers.changeFiltersByParams('brightness', true);
          break;
        // 模糊
        case 'blurEnabled':
          target.set(property, value);
          this.filterHandlers.changeFiltersByParams('blur', value);
          break;
        case 'blurRadius':
          target.set(property, value);
          this.filterHandlers.changeFiltersByParams('blur', true);
          break;
        // 阴影
        case 'shadowEnabled':
          target.set(property, value);
          // 渲染层的实现
          if (value) {
            this.effectHandlers.setShadow({ blur: 10, color: '#000', offsetX: 10, offsetY: 10 });
          } else {
            this.effectHandlers.setShadow({});
          }
          break;
        case 'shadowBlur':
          this.effectHandlers.setShadowBlur(value);
          break;
        case 'shadowOffsetX':
          this.effectHandlers.setShadowOffsetX(value);
          break;
        case 'shadowOffsetY':
          this.effectHandlers.setShadowOffsetY(value);
          break;
        case 'shadowColor':
          this.effectHandlers.setShadowColor(value);
          break;
        default:
          target.set(property, value);
          break;
      }

      target.setCoords();
      this.canvas.renderAll();

      this.event.emit(SelectEvent.UPDATA, Math.random());
    });
  }

  /**
   * 删除元素
   */
  remove() {
    const activeObject = this.canvas.getActiveObject();
    if (!activeObject) {
      return false;
    }
    this.canvas.discardActiveObject();
    this.canvas.remove(activeObject);
    this.event.emit(SelectEvent.UPDATA, Math.random());
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

      this.workareaHandlers.hookImportAfter().then(() => {
        this.canvas.renderAll();
        callback && callback();
      });
    });
  }
}

export default Handlers;
