import { SelectEvent } from '../utils/types';
import Handlers from './handlers';

enum ItypeKey {
  lockMovementX = 'lockMovementX',
  lockMovementY = 'lockMovementY',
  lockRotation = 'lockRotation',
  lockScalingX = 'lockScalingX',
  lockScalingY = 'lockScalingY',
}

class LockHandlers {
  constructor(private handlers: Handlers) {
    this._init();
  }

  _init() {}

  lock() {
    const activeObject = this.handlers.canvas.getActiveObject();
    if (activeObject) {
      // 修改锁定默认属性（TODO：如果是文字元素，如何禁止他可编辑）
      Object.values(ItypeKey).forEach((key: ItypeKey) => {
        activeObject[key] = true;
      });
      activeObject.hasControls = false;
      this.handlers.canvas.renderAll();

      this.handlers.event.emit(SelectEvent.UPDATA, Math.random());
    }
  }

  unLock() {
    const activeObject = this.handlers.canvas.getActiveObject();
    if (activeObject) {
      activeObject.hasControls = true;
      activeObject.selectable = true;
      activeObject.evented = true;
      Object.values(ItypeKey).forEach((key: ItypeKey) => {
        activeObject[key] = false;
      });
      this.handlers.canvas.renderAll();

      this.handlers.event.emit(SelectEvent.UPDATA, Math.random());
    }
  }
}

export default LockHandlers;
