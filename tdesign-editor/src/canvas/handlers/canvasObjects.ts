import { Textbox } from 'fabric';

export const CanvasObjects = {
  textbox: {
    render: (options) => {
      const { text, ...textOptions } = options;
      return new Textbox(text, textOptions);
    },
  },
};
