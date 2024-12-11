import React, { useEffect } from 'react';
import styled from 'styled-components';
import Handler, { useContainerHandler } from './handlers';
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
  const containerRef = useContainerHandler({ store });

  // 初始化画布
  useEffect(() => {
    const initialWidth = containerRef.current.clientWidth;
    const initialHeigh = containerRef.current.clientHeight;
    const canvas = new Canvas('canvas', {
      backgroundColor: backgroundColor || 'rgba(232, 232, 232, 0.9)',
      height: initialHeigh,
      width: initialWidth,
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: true, // 禁止默认右键菜单
      controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
      preserveObjectStacking: true, // 当选择画布中的对象时，让对象不在顶层。
    });
    const _handler = new Handler(canvas);
    store.setHandler(_handler);
  }, []);

  return (
    <EditorCanvas ref={containerRef}>
      <canvas id="canvas"></canvas>
    </EditorCanvas>
  );
});
