import { fabric } from 'fabric';

export const CanvasObjects = {
  textbox: {
    render: (options) => {
      const { text, ...textOptions } = options;
      return new fabric.Textbox(text, textOptions);
    },
  },
  image: {
    render: async (options) => {
      const { src, ...imageOptions } = options;
      const imageElement = await new Promise<fabric.Image>((resolve) => {
        fabric.Image.fromURL(
          src,
          (imgEl) => {
            resolve(imgEl);
          },
          { crossOrigin: 'anonymous' },
        );
      });
      Object.keys(imageOptions).forEach((key: keyof fabric.Image) => {
        imageElement.set(key, imageOptions[key]);
      });
      return imageElement;
    },
  },
};
