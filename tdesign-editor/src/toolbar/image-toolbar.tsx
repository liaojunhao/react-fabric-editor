import { StoreType } from '../model/store';
import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { extendToolbar, ElementContainer } from './element-container';
import { FlipButton } from './flip-button';
import { FiltersPicker } from './filters-picker';

const PROPS_MAP = {
  ImageFlip: FlipButton,
  ImageFilters: FiltersPicker,
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
  const keys = ['ImageFlip', 'ImageFilters'];
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
