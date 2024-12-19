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
      // const { src, ...imageOptions } = options;
      // const imageElement = await FabricImage.fromURL(
      //   src,
      //   { crossOrigin: 'anonymous' },
      //   {
      //     ...{
      //       angle: 0,
      //       hasControls: true,
      //       hasBorders: true,
      //       opacity: 1,
      //       originX: 'left',
      //       originY: 'top',
      //       borderColor: '#ff8d23',
      //     },
      //     ...imageOptions,
      //   },
      // );
      // return imageElement;
    },
  },
};
