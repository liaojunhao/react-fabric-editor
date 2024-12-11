import Handlers from './handlers';
import { util, Rect } from 'fabric';
class EventHandlers {
  constructor(private handlers: Handlers) {}

  private _getScale() {
    const scale = util.findScaleToFit(this.handlers.workareaHandler.workarea, {
      width: this.handlers.canvasElParent.offsetWidth,
      height: this.handlers.canvasElParent.offsetHeight,
    });
    return scale;
  }

  auto() {
    const scale = this._getScale();
  }

  /**
   * 设置画布中心到指定对象中心点上
   * @param {Object} obj 指定的对象
   */
  setCenterFromObject(obj: Rect) {
    const { canvas } = this.handlers;
    const objCenter = obj.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;
    if (canvas.width === undefined || canvas.height === undefined || !viewportTransform) return;
    viewportTransform[4] = canvas.width / 2 - objCenter.x * viewportTransform[0];
    viewportTransform[5] = canvas.height / 2 - objCenter.y * viewportTransform[3];
    canvas.setViewportTransform(viewportTransform);
    canvas.renderAll();
  }

  resize(nextWidth: number, nextHeight: number) {
    const canvas = this.handlers.canvas;
    const workarea = this.handlers.workareaHandler.workarea;
    // 设置新的画布大小
    canvas.setWidth(nextWidth);
    canvas.setHeight(nextHeight);

    if (!workarea) return;
    this.setCenterFromObject(workarea);

    // 超出画布不展示
    workarea.clone(this.handlers.propertiesToInclude).then((cloned) => {
      canvas.clipPath = cloned;
      canvas.requestRenderAll();
    });
  }
}

export default EventHandlers;
