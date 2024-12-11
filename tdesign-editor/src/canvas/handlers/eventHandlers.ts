import Handlers from './handlers';
class EventHandlers {
  constructor(private handlers: Handlers) {}
  resize(nextWidth: number, nextHeight: number) {
    console.log(nextWidth, nextHeight);
    const canvas = this.handlers.canvas;
    const workarea = this.handlers.workareaHandler.workarea;
    // 设置新的画布大小
    canvas.setWidth(nextWidth);
    canvas.setHeight(nextHeight);

    if (!workarea) return;

    const objCenter = workarea.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;
    if (canvas.width === undefined || canvas.height === undefined || !viewportTransform) return;
    viewportTransform[4] = canvas.width / 2 - objCenter.x * viewportTransform[0];
    viewportTransform[5] = canvas.height / 2 - objCenter.y * viewportTransform[3];
    canvas.setViewportTransform(viewportTransform);
    canvas.renderAll();
  }
}

export default EventHandlers;
