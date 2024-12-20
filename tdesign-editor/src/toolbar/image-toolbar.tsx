import { StoreType } from '../model/store';
import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { extendToolbar, ElementContainer } from './element-container';
import { FlipButton } from './flip-button';
import { FiltersPicker } from './filters-picker';
import { Button } from '@blueprintjs/core';
import { Crop } from '@blueprintjs/icons';
import { getName } from '../utils/l10n';
import { getCrop, getImageSize } from '../utils/image';
import { RemoveBackgroundButton } from './remove-background-button';

// 适配到页面大小
export const ImageFitToBackground = ({ element, store }) => {
  return (
    <Button
      text={getName('toolbar.fitToBackground')}
      minimal={true}
      onClick={async () => {
        const computedWidth = store.width;
        const computedHeight = store.height;
        const originImg = await getImageSize(element.getSrc());
        // TODO：还需要去设置裁剪之，等做裁剪的时候在考虑
        const crop = getCrop({ width: computedWidth, height: computedHeight }, originImg);
      }}
    ></Button>
  );
};

// 图片蒙版
export const ImageClip = ({ element, store }) => {
  return <Button minimal={true} text={getName('toolbar.clip')}></Button>;
};

// 图片裁剪
export const ImageCrop = () => {
  return (
    <Button
      minimal={true}
      text={getName('toolbar.crop')}
      icon={<Crop />}
      onClickCapture={(event) => {
        event.stopPropagation();
      }}
    ></Button>
  );
};

const PROPS_MAP = {
  ImageFlip: FlipButton,
  ImageFilters: FiltersPicker,
  ImageFitToBackground: ImageFitToBackground,
  ImageClip: ImageClip,
  ImageCrop: ImageCrop,
  ImageRemoveBackground: RemoveBackgroundButton,
};

type Props = {
  store: StoreType;
  components?: any;
};
export const ImageToolbar = observer(({ store, components }: Props) => {
  const r = store.selectedElements[0];
  const n = store.selectedElements;
  const o = r._cropModeEnabled;
  const a = useRef({});
  const keys = ['ImageFlip', 'ImageFilters', 'ImageFitToBackground', 'ImageClip', 'ImageCrop', 'ImageRemoveBackground'];
  const i = extendToolbar({ type: 'image', usedItems: keys, components: components });

  return (
    <>
      {!o && (
        <ElementContainer
          items={i}
          itemRender={(o) => {
            const RenderComponent = components[o] || PROPS_MAP[o];
            return <RenderComponent elements={n} element={r} store={store} key={o} />;
          }}
        ></ElementContainer>
      )}
    </>
  );
});
