export function getImageSize(t) {
  return new Promise<{ width: number; height: number }>((e) => {
    const i = document.createElement('img');
    i.onload = async () => {
      if (0 === i.width || 0 === i.height) {
        // e(await (0, svg_1.getSvgSize)(t))
      } else {
        e({ width: i.width, height: i.height });
      }
    };
    i.crossOrigin = 'anonymous';
    i.src = t;
  });
}
