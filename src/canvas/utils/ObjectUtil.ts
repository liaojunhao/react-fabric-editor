export interface WorkareaOption {
  /**
   * Image URL
   * @type {string}
   */
  src?: string;
  /**
   * Image File or Blbo
   * @type {File}
   */
  file?: File;
  /**
   * Workarea Width
   * @type {number}
   */
  width?: number;
  /**
   * Workarea Height
   * @type {number}
   */
  height?: number;
  /**
   * Workarea Background Color
   * @type {string}
   */
  backgroundColor?: string;
}

export type WorkareaObject = fabric.Image & {
  /**
   * Workarea Image Element
   * @type {HTMLImageElement}
   */
  _element?: HTMLImageElement;
  /**
   * Whether exist the element
   * @type {boolean}
   */
  isElement?: boolean;
  /**
   * Stored width in workarea
   * @type {number}
   */
  workareaWidth?: number;
  /**
   * Stored height in workarea
   * @type {number}
   */
  workareaHeight?: number;
};
