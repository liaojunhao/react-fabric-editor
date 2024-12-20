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

export function getCrop(t, e) {
  const { width: i, height: h } = t;
  const o = i / h;
  let g, n;
  o >= e.width / e.height ? ((g = e.width), (n = e.width / o)) : ((g = e.height * o), (n = e.height));
  const r = (e.width - g) / 2,
    c = (e.height - n) / 2;
  return { cropX: r / e.width, cropY: c / e.height, cropWidth: g / e.width, cropHeight: n / e.height };
}
