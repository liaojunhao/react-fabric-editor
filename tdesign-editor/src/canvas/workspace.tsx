import React, { useEffect, createRef } from 'react';
import styled from 'styled-components';
import Handler from './handlers';
import { Canvas } from 'fabric';
import { StoreType } from '../model/store';
import { observer } from 'mobx-react-lite';

const EditorCanvas = styled.div`
  flex: 1;
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
    const _handler = new Handler({
      canvasElParent: containerRef.current,
      canvasEl: canvasEl.current,
      backgroundColor: backgroundColor,
    });
    store.setHandler(_handler);
  }, []);

  return (
    <EditorCanvas ref={containerRef}>
      <canvas id="canvas" ref={canvasEl}></canvas>
    </EditorCanvas>
  );
});
