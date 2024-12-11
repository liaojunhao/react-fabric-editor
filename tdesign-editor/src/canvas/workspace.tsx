import React, { useEffect, createRef } from 'react';
import styled from 'styled-components';
import Handlers from './handlers';
import { StoreType } from '../model/store';
import { observer } from 'mobx-react-lite';

const EditorCanvas = styled.div`
  background-color: rgba(232, 232, 232, 0.9);
`;

export type WorkspaceProps = {
  store: StoreType;
  components?: any;
  backgroundColor?: string;
};
export const Workspace = observer(({ backgroundColor, store }: WorkspaceProps) => {
  const containerRef = createRef<HTMLDivElement>();
  const canvasEl = createRef<HTMLCanvasElement>();

  // 初始化画布
  useEffect(() => {
    const _handler = new Handlers({
      canvasElParent: containerRef.current,
      canvasEl: canvasEl.current,
      backgroundColor: backgroundColor,
    });
    store.setHandler(_handler);

    // 监听画布的变化
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        _handler.eventHandlers.resize(newWidth, newHeight);
      }
    });
    // 开始监听
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <EditorCanvas
      ref={containerRef}
      style={{ width: '100%', height: '100%', position: 'relative', outline: 'none', flex: 1 }}
      tabIndex={0}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
        <canvas id="canvas" ref={canvasEl}></canvas>
      </div>
    </EditorCanvas>
  );
});
