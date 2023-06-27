import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import Handler from './handlers/Handler';

const Canvas = () => {
  const canvas = useRef<fabric.Canvas>();

  useEffect(() => {
    console.log('执行多次嘛');
    // 创建fabric对象
    canvas.current = new fabric.Canvas('canvas', {
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: true, // 禁止默认右键菜单
      controlsAboveOverlay: true // 超出clipPath后仍然展示控制条
    });

    // 初始化控制器
    const handler = new Handler({
      canvas: canvas.current
    });
  }, []);

  return (
    <div className="canvas-box">
      <div className="inside-shadow"></div>
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default Canvas;
