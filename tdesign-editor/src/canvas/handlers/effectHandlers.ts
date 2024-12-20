import Handlers from './handlers';
import { fabric } from 'fabric';

class EffectHandlers {
  constructor(private handlers: Handlers) {}

  /**
   * 设置图片圆角
   */
  setImageBorderRadius(value: number) {
    const activeObject = this.handlers.canvas.getActiveObject();
    if (!activeObject) {
      return;
    }

    if (value === 0) {
      activeObject.clipPath = null;
    } else {
      const rect = new fabric.Rect({
        left: -activeObject.width / 2,
        top: -activeObject.height / 2,
        rx: value,
        ry: value,
        width: activeObject.width,
        height: activeObject.height,
        fill: value.toString(),
      });
      // 为什么要深度才会渲染？
      activeObject.set('dirty', true);
      activeObject.clipPath = rect;
    }
  }

  /**
   * 初始化阴影
   */
  setShadow({ blur, color, offsetX, offsetY }: { blur?: number; color?: string; offsetX?: number; offsetY?: number }) {
    const currentObj = this.handlers.canvas.getActiveObject();
    if (!currentObj) {
      return;
    }
    const defaultBlur = 10;
    const defaultOffsetX = 0;
    const defaultOffsetY = 10;
    if (!blur && !color && !offsetX && !offsetY) {
      currentObj.shadow = null;
    } else {
      currentObj.shadow = new fabric.Shadow({
        blur: blur ?? defaultBlur,
        color: color ?? '#000000',
        offsetX: offsetX ?? defaultOffsetX,
        offsetY: offsetY ?? defaultOffsetY,
      });
    }
    this.handlers.canvas.renderAll();
  }

  /**
   * 设置阴影模糊半径
   * @param blur
   * @returns
   */
  setShadowBlur(blur: number) {
    const currentObj = this.handlers.canvas.getActiveObject();
    if (!currentObj) {
      return;
    }
    if (currentObj.shadow) {
      (currentObj.shadow as fabric.Shadow).blur = blur;
    }
    this.handlers.canvas.renderAll();
  }

  /**
   * 设置阴影x
   * @param offsetX
   * @returns
   */
  setShadowOffsetX(offsetX: number) {
    const currentObj = this.handlers.canvas.getActiveObject();
    if (!currentObj) {
      return;
    }
    if (currentObj.shadow) {
      (currentObj.shadow as fabric.Shadow).offsetX = offsetX;
    }
    this.handlers.canvas.renderAll();
  }
  /**
   * 设置阴影y
   * @param offsetY
   * @returns
   */
  setShadowOffsetY(offsetY: number) {
    const currentObj = this.handlers.canvas.getActiveObject();
    if (!currentObj) {
      return;
    }
    if (currentObj.shadow) {
      (currentObj.shadow as fabric.Shadow).offsetY = offsetY;
    }
    this.handlers.canvas.renderAll();
  }

  /**
   * 设置阴影颜色
   * @param color
   * @returns
   */
  setShadowColor(color: string) {
    const currentObj = this.handlers.canvas.getActiveObject();
    if (!currentObj) {
      return;
    }
    if (currentObj.shadow) {
      (currentObj.shadow as fabric.Shadow).color = color;
    }
    this.handlers.canvas.renderAll();
  }
}

export default EffectHandlers;
