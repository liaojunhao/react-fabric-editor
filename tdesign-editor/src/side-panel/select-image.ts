import { StoreType } from '../model/store';
import { FabricImage } from 'fabric';
type Props = {
  store: StoreType;
  src: string;
  droppedPos?: {
    x: number;
    y: number;
  };
  targetElement?: FabricImage;
};

export const selectImage = async ({ src, droppedPos, targetElement, store }: Props) => {};
