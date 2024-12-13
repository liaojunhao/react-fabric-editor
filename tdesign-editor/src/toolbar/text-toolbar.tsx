import React from 'react';
import { StoreType } from '../model/store';
import { extendToolbar, ElementContainer } from './element-container';
type InputProps = {
  elements: Array<any>;
  store: StoreType;
};
type PageProps = {
  store: StoreType;
  components?: any;
};

const FontMenu = () => {
  return <div>字体列表</div>;
};

export const TextFontFamily = ({ elements, store }: InputProps) => {
  return <FontMenu></FontMenu>;
};

const PROPS_MAP = {
  TextFontFamily: TextFontFamily,
};
export const TextToolbar: React.FC<PageProps> = ({ store, components }) => {
  const n = store.selectedElements;
  const keys = ['TextFill', 'TextFontFamily', 'TextFontSize', 'TextFontVariant', 'TextSpacing', 'TextFilters'];
  const r = extendToolbar({ type: 'text', usedItems: keys, components: components });

  return (
    <ElementContainer
      items={r}
      itemRender={(a) => {
        const RenderComponent = components[a] || PROPS_MAP[a];
        return RenderComponent && <RenderComponent elements={n} element={n[0]} store={store} key={a}></RenderComponent>;
      }}
    ></ElementContainer>
  );
};
