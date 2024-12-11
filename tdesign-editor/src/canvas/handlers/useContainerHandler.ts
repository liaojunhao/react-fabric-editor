import { StoreType } from '../../model/store';
import { createRef, useCallback, useEffect } from 'react';

function useContainerHandler({ store }: { store: StoreType }) {
  const containerRef = createRef<HTMLDivElement>();
  const updateCanvasSize = useCallback((w, h) => {}, []);
  useEffect(() => {
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    updateCanvasSize(containerWidth, containerHeight);
  }, []);

  return containerRef;
}

export default useContainerHandler;
