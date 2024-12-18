import { Textbox, FabricImage } from 'fabric';
import { nanoid } from 'nanoid';
import Handlers from '../handlers';

export const CanvasObjects = {
  textbox: {
    render: (options) => {
      const { text, ...textOptions } = options;
      return new Textbox(text, textOptions);
    },
  },
  image: {
    render: async (options, handlers?: Handlers) => {
      const { src, ...imageOptions } = options;
      const imageElement = await FabricImage.fromURL(
        src,
        { crossOrigin: 'anonymous' },
        {
          ...{
            id: nanoid(10),
            angle: 0,
            hasControls: true,
            hasBorders: true,
            opacity: 1,
            originX: 'left',
            originY: 'top',
            borderColor: '#ff8d23',
          },
          ...imageOptions,
        },
      );

      return imageElement;
    },
  },
};
