import { StoreType } from '../model/store';
// import { FabricImage } from 'fabric';
import { getImageSize } from '../utils/image';
type Props = {
  store: StoreType;
  src: string;
  droppedPos?: {
    x: number;
    y: number;
  };
  targetElement?: any;
};

export const selectImage = async ({ src, droppedPos, targetElement, store }: Props) => {
  let { width: n, height: g } = await getImageSize(src);
  const scale = Math.min(store.width / n, store.height / g, 1);
  n *= scale;
  g *= scale;
  // const c = ((null == t ? void 0 : t.x) || s.width / 2) - n / 2,
  // r = ((null == t ? void 0 : t.y) || s.height / 2) - g / 2;
  store.addElement({ type: 'image', src: src, scaleX: scale, scaleY: scale }, {});
};
