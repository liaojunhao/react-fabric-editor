import Handlers from './handlers';

class EventHandlers {
  constructor(private handlers: Handlers) {
    const { moving, beforeRender, afterRender } = this;
    // this.handlers.canvas.on({
    //   'before:render': beforeRender.bind(this),
    //   'after:render': afterRender.bind(this),
    // });

    // 绑定键盘事件
    this.attachEventListener();
  }

  attachEventListener() {
    this.handlers.canvas.wrapperEl.tabIndex = 1000;
    document.addEventListener('keydown', this.keydown.bind(this), false);
  }

  keydown(e) {
    if (this.handlers.canvas.wrapperEl !== document.activeElement) {
      return false;
    }
    // 删除
    (46 !== e.keyCode && 8 !== e.keyCode) || this.handlers.remove();
  }

  moving() {}

  beforeRender() {}

  afterRender() {}
}

export default EventHandlers;
