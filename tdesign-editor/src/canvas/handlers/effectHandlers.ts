import Handlers from './handlers';
import { Shadow } from 'fabric';

class EffectHandlers {
  constructor(private handlers: Handlers) {}

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
      currentObj.shadow = new Shadow({
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
      currentObj.shadow.blur = blur;
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
      currentObj.shadow.offsetX = offsetX;
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
      currentObj.shadow.offsetY = offsetY;
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
      currentObj.shadow.color = color;
    }
    this.handlers.canvas.renderAll();
  }
}

export default EffectHandlers;
