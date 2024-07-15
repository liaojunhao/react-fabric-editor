import React, { useRef } from 'react';
import { StoreType } from '../model/store';

export type WorkspaceProps = {
  store: StoreType;
  components?: any;
};
const WorkspaceCanvas: React.FC<WorkspaceProps> = ({ store }) => {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  //   console.log('store.pages', store.toJSON());
  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        outline: 'none',
        flex: 1,
        backgroundColor: 'rgba(232, 232, 232, 0.9)',
      }}
      tabIndex={0}
      className="tdesign-workspace-container"
    >
      <div
        ref={innerRef}
        onScroll={(e) => {}}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'auto',
          overflowX: 'hidden',
        }}
        className="tdesign-workspace-inner"
      >
        {store.pages.map((item) => {
          console.log('item', item);
          return <div>{item.id + '123'}</div>;
        })}
      </div>
    </div>
  );
};

export default WorkspaceCanvas;
