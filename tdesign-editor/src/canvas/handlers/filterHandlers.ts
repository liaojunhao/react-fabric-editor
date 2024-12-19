import Handlers from './handlers';
import { fabric } from 'fabric';

class FilterHandlers {
  constructor(private handlers: Handlers) {}

  /**
   * 只有图片可以改滤镜
   * @param type
   * @param value
   */
  changeColorMode(type: string, value: number) {
    const activeObject = this.handlers.canvas.getActiveObject() as fabric.Image;
    if (!activeObject) return;
    switch (type) {
      case 'blur':
        const blurFilter = new fabric.Image.filters.Blur({ blur: value });
        // 避免删除到其他的滤镜效果
        activeObject.filters.filter((obj) => console.log(obj));
        // activeObject.filters = activeObject.filters.filter((obj) => obj.type !== type);
        // activeObject.filters.push(blurFilter);
        break;

      default:
        break;
    }

    activeObject.applyFilters();
    this.handlers.canvas.renderAll();
  }
}

export default FilterHandlers;
