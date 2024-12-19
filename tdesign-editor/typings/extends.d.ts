declare namespace fabric {
  export interface Canvas {
    contextTop: CanvasRenderingContext2D;
    lowerCanvasEl: HTMLElement;
    wrapperEl: HTMLElement;
    isDragging: boolean;
    historyProcessing: boolean;
    _currentTransform: unknown;
    extraProps: any;
    refreshHistory(): void;
    clearHistory(boolean?): void;
    clearUndo(): void;
    _historyNext(): void;
    _historyInit(): void;
    offHistory(): void;
    _centerObject: (obj: fabric.Object, center: fabric.Point) => fabric.Canvas;
    _setupCurrentTransform(e: Event, target: fabric.Object, alreadySelected: boolean): void;
  }

  export interface Object {
    extensionType?: string;
    extension: any;
    type: string;
    height: number;
    top: number;
    left: number;
    lockMovementX: boolean;
    lockMovementY: boolean;
    lockRotation: boolean;
    lockScalingX: boolean;
    lockScalingY: boolean;
    forEachObject?: ICollection.forEachObject;
    fontFamily?: string;
    _objects?: ICollection.Object[];
    aCoords?: any;
    [string]?: any;
  }

  export interface IObjectOptions {
    /**
     * 标识
     */
    id?: string | undefined;
  }

  export interface IUtil {
    findScaleToFit: (
      source: Record<string, unknown> | fabric.Object,
      destination: Record<string, unknown> | fabric.Object,
    ) => number;
  }
}
