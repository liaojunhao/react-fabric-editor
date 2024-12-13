import React, { useEffect, useState } from 'react';
import { StoreType } from '../model/store';
import { extendToolbar, ElementContainer } from './element-container';
import useSWR from 'swr';
import { getGoogleFontsListAPI } from '../utils/api';
import { isGoogleFontChanged, getFontsList, globalFonts } from '../utils/fonts';
import { Popover, Button } from '@blueprintjs/core';

type InputProps = {
  elements: Array<any>;
  store: StoreType;
};

type PageProps = {
  store: StoreType;
  components?: any;
};

const googleFonts = getFontsList();

const FontMenu = ({ store, fonts, activeFont, activeFontLabel, onFontSelect }) => {
  const [o, i] = useState('');
  const l = fonts.filter((e) => e.toLowerCase().indexOf(o.toLowerCase()) >= 0);
  return (
    <Popover
      content={
        <div>
          <div>搜索</div>
          <div style={{ paddingTop: '5px' }}></div>
        </div>
      }
    >
      <Button
        text={activeFontLabel}
        rightIcon="caret-down"
        minimal={true}
        style={{
          marginRight: '5px',
          fontFamily: '"' + activeFont + '"',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          maxHeight: '30px',
        }}
      ></Button>
    </Popover>
  );
};
const cache = {};
const fetcher = (e) =>
  cache[e]
    ? Promise.resolve(cache[e])
    : fetch(e)
        .then((e) => e.json())
        .then((t) => ((cache[e] = t), t));

export const TextFontFamily = ({ elements, store }: InputProps) => {
  // 获取全局字体
  const { data, mutate } = useSWR(getGoogleFontsListAPI(), fetcher, {
    isPaused: () => isGoogleFontChanged(),
    fallbackData: [],
  });
  useEffect(() => {
    mutate();
  }, [isGoogleFontChanged()]);
  const r = store.fonts
    .concat(globalFonts)
    .map((e) => e.fontFamily)
    .concat(data?.length && !isGoogleFontChanged() ? data : googleFonts);
  let elementName = elements[0].fontFamily;
  elementName.length > 15 && (elementName = elementName.slice(0, 15) + '...');
  const i = [];
  store.objects.forEach((item) => {
    if ('Textbox' === item.type) {
      i.push(item.fontFamily);
    }
  });
  const l = [...new Set(i.concat('_divider').concat(r))];
  return (
    <FontMenu
      fonts={l}
      store={store}
      activeFont={elements[0].fontFamily}
      activeFontLabel={elementName}
      onFontSelect={(n) => {}}
    ></FontMenu>
  );
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
