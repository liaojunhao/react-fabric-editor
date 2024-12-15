import React, { useEffect, useState, useRef } from 'react';
import { StoreType } from '../model/store';
import { extendToolbar, ElementContainer } from './element-container';
import useSWR from 'swr';
import { getGoogleFontsListAPI } from '../utils/api';
import { isGoogleFontChanged, getFontsList, globalFonts } from '../utils/fonts';
import { Popover, Button, InputGroup, MenuItem, MenuDivider, ButtonGroup, NumericInput } from '@blueprintjs/core';
import { Search, AlignLeft, AlignCenter, AlignRight, AlignJustify } from '@blueprintjs/icons';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';
import { getGoogleFontImage } from '../utils/api';
import { observer } from 'mobx-react-lite';

type InputProps = {
  elements: Array<any>;
  store: StoreType;
};

type PageProps = {
  store: StoreType;
  components?: any;
};

const Image = styled.img`
  height: 20px;

  .bp5-dark & {
    filter: invert(1);
  }
`;

const googleFonts = getFontsList();

const FontItem = ({ fontFamily, handleClick, modifiers, store, isCustom }) => {
  const [l, o] = useState(!isCustom);

  useEffect(() => {
    l || store.loadFont(fontFamily);
  }, [fontFamily, l]);

  if ('_divider' === fontFamily) {
    return (
      <div style={{ paddingTop: 10 }}>
        <MenuDivider></MenuDivider>
      </div>
    );
  }
  const i = l ? (
    <Image
      src={getGoogleFontImage(fontFamily)}
      alt={fontFamily}
      onError={() => {
        o(!1);
      }}
    ></Image>
  ) : (
    fontFamily
  );

  return (
    <MenuItem
      text={i}
      active={modifiers.active}
      disabled={modifiers.disabled}
      onClick={handleClick}
      style={{ fontFamily: '"' + fontFamily + '"' }}
    ></MenuItem>
  );
};
const SearchInput = ({ onChange, defaultValue }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);
  return (
    <InputGroup
      inputRef={inputRef}
      leftIcon={<Search />}
      defaultValue={defaultValue}
      onChange={(t) => {
        onChange(t.target.value);
      }}
    ></InputGroup>
  );
};
const FontMenu = ({ store, fonts, activeFont, activeFontLabel, onFontSelect }) => {
  const [key, setKey] = useState('');
  const i = fonts.filter((e) => e.toLowerCase().indexOf(key.toLowerCase()) >= 0);
  return (
    <Popover
      content={
        <div>
          <SearchInput
            onChange={(e) => {
              setKey(e);
            }}
            defaultValue={key}
          />
          <div style={{ paddingTop: 6 }}>
            <FixedSizeList height={Math.min(400, 30 * i.length) + 10} width={210} itemCount={i.length} itemSize={30}>
              {({ index, style }) => {
                const item = i[index];
                return (
                  <div style={style}>
                    <FontItem
                      key={item}
                      fontFamily={item}
                      modifiers={{ active: activeFont === item }}
                      handleClick={() => {
                        onFontSelect(item);
                      }}
                      store={store}
                      isCustom={
                        store.fonts.find((e) => e.fontFamily === item) || globalFonts.find((e) => e.fontFamily === item)
                      }
                    ></FontItem>
                  </div>
                );
              }}
            </FixedSizeList>
          </div>
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
// 字体设置
export const TextFontFamily = observer(({ elements, store }: InputProps) => {
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
    if ('textbox' === item.type.toLowerCase()) {
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
      onFontSelect={(n) => {
        console.log('选择了这个字体', n);
      }}
    ></FontMenu>
  );
});
// 字号大小
export const TextFontSize = observer(({ elements, store }: InputProps) => {
  return (
    <NumericInput
      onValueChange={(n) => {
        // elements是真实的实例
        elements.forEach((e) => {
          store.setElement(e, { fontSize: n, width: Math.max(n, e.width) });
        });
      }}
      value={Math.round(elements[0].fontSize)}
      style={{ width: 50 }}
      min={5}
      max={4 * store.height}
    ></NumericInput>
  );
});
const ALIGN_OPTIONS = ['left', 'center', 'right', 'justify'];
// 文字对齐方式
export const TextFontVariant = observer(({ elements, store }: InputProps) => {
  const n = elements[0]; // 这里默认显示第一个元素的对齐方式
  const align = n.textAlign;

  return (
    <ButtonGroup>
      <Button
        minimal={true}
        icon={
          align === 'left' ? (
            <AlignLeft />
          ) : align === 'center' ? (
            <AlignCenter />
          ) : align === 'right' ? (
            <AlignRight />
          ) : (
            <AlignJustify />
          )
        }
        onClick={() => {
          const a = (ALIGN_OPTIONS.indexOf(n.textAlign) + 1 + ALIGN_OPTIONS.length) % ALIGN_OPTIONS.length;
          const r = ALIGN_OPTIONS[a];
          elements.forEach((e) => {
            store.setElement(e, { textAlign: r });
          });
        }}
      ></Button>
    </ButtonGroup>
  );
});

const PROPS_MAP = {
  TextFontFamily: TextFontFamily,
  TextFontSize: TextFontSize,
  TextFontVariant: TextFontVariant,
};

/**
 * 文字工具栏
 *  - 这里多选择都是文字的时候给他统一的设置
 */
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
