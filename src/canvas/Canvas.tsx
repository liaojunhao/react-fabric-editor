import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { fabric } from 'fabric';
import Handler from './handlers/Handler';

const Canvas = forwardRef((props, ref) => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [handler, setHandler] = useState<Handler>();

  useEffect(() => {
    console.log('执行多次嘛');
    // 创建fabric对象
    const canvas = new fabric.Canvas('canvas', {
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: true, // 禁止默认右键菜单
      controlsAboveOverlay: true // 超出clipPath后仍然展示控制条
    });
    setCanvas(canvas);
    // 初始化控制器
    const handler = new Handler({
      canvas: canvas
    });
    setHandler(handler);
  }, []);

  useImperativeHandle(ref, () => ({
    canvas: canvas,
    handler: handler
  }));

  return (
    <div className="canvas-box">
      <div className="inside-shadow"></div>
      <canvas id="canvas"></canvas>
    </div>
  );
});

export default Canvas;
