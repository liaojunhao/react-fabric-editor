import React, { useEffect, createRef } from 'react';
import styled from 'styled-components';
import Handlers from './handlers';
import { StoreType } from '../model/store';
import { observer } from 'mobx-react-lite';
import { SelectEvent } from './utils/types';
import { PROPERTIES_TO_INCLUDE } from './constants';

const EditorCanvas = styled.div``;

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
      workareaWidth: store.width,
      workareaHeight: store.height,
    });
    store.setHandler(_handler);

    /**
     * 监听选择事件
     */
    _handler.event.on(SelectEvent.ONE, (e: any[]) => {
      store.selectElements(e.map((i) => i.id));
    });
    _handler.event.on(SelectEvent.MULTI, (e) => {
      store.selectElements(e.map((i) => i.id));
    });
    _handler.event.on(SelectEvent.CANCEL, (e) => {
      store.selectElements(e.map((i) => i.id));
    });
    /**
     * 监听数据有改变
     */
    _handler.event.on(SelectEvent.CHANGE, (e) => {
      store.setObjects(e);
    });

    //@ts-expect-error 测试使用
    window._c = _handler;
  }, []);

  return (
    <EditorCanvas
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        outline: 'none',
        flex: 1,
        backgroundColor: backgroundColor || '#f1f1f1',
      }}
      tabIndex={0}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
        <canvas id="canvas" ref={canvasEl}></canvas>
      </div>
    </EditorCanvas>
  );
});
