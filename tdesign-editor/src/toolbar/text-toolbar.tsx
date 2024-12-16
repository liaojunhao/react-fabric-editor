import React, { useEffect, useState, useRef } from 'react';
import { StoreType } from '../model/store';
import { extendToolbar, ElementContainer } from './element-container';
import useSWR from 'swr';
import { getGoogleFontsListAPI } from '../utils/api';
import { isGoogleFontChanged, getFontsList, globalFonts } from '../utils/fonts';
import {
  Popover,
  Button,
  InputGroup,
  MenuItem,
  MenuDivider,
  ButtonGroup,
  NumericInput,
  Position,
  Slider,
} from '@blueprintjs/core';
import {
  Search,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Strikethrough,
} from '@blueprintjs/icons';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';
import { getGoogleFontImage } from '../utils/api';
import { observer } from 'mobx-react-lite';
import ColorPicker from './color-picker';
import { getName } from '../utils/l10n';
import { FiltersPicker } from './filters-picker';

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
  const n = elements[0];
  const textAlign = n.textAlign;
  const fontWeight = n.fontWeight;
  const fontStyle = n.fontStyle;
  const underline = n.underline;
  const linethrough = n.linethrough;

  return (
    <ButtonGroup style={{ gap: 5 }}>
      <Button
        minimal={true}
        icon={
          textAlign === 'left' ? (
            <AlignLeft />
          ) : textAlign === 'center' ? (
            <AlignCenter />
          ) : textAlign === 'right' ? (
            <AlignRight />
          ) : (
            <AlignJustify />
          )
        }
        onClick={() => {
          const a = (ALIGN_OPTIONS.indexOf(textAlign) + 1 + ALIGN_OPTIONS.length) % ALIGN_OPTIONS.length;
          const r = ALIGN_OPTIONS[a];
          elements.forEach((e) => {
            store.setElement(e, { textAlign: r });
          });
        }}
      ></Button>
      <Button
        minimal={true}
        icon={<Bold />}
        active={fontWeight === 'bold'}
        onClick={() => {
          const a = 'bold' === fontWeight;
          elements.forEach((e) => {
            a ? store.setElement(e, { fontWeight: 'normal' }) : store.setElement(e, { fontWeight: 'bold' });
          });
        }}
      ></Button>
      <Button
        minimal={true}
        icon={<Italic />}
        active={fontStyle === 'italic'}
        onClick={() => {
          const a = 'italic' === fontStyle;
          elements.forEach((e) => {
            a ? store.setElement(e, { fontStyle: 'normal' }) : store.setElement(e, { fontStyle: 'italic' });
          });
        }}
      ></Button>
      <Button
        minimal={true}
        icon={<Underline />}
        active={underline}
        onClick={() => {
          elements.forEach((e) => {
            underline ? store.setElement(e, { underline: false }) : store.setElement(e, { underline: true });
          });
        }}
      ></Button>
      <Button
        minimal={true}
        icon={<Strikethrough />}
        active={linethrough}
        onClick={() => {
          elements.forEach((e) => {
            linethrough ? store.setElement(e, { linethrough: false }) : store.setElement(e, { linethrough: true });
          });
        }}
      ></Button>
    </ButtonGroup>
  );
});
// 文字颜色
export const TextFill = observer(({ elements, store }: InputProps) => {
  const element = elements[0];
  return (
    <ColorPicker
      value={element.fill}
      style={{ marginRight: '5px' }}
      gradientEnabled={false}
      onChange={(color) => {
        elements.forEach((e) => {
          store.setElement(e, { fill: color });
        });
      }}
      store={store}
    ></ColorPicker>
  );
});

export const NumberInput = ({ value, onValueChange, ...option }) => {
  const [r, l] = useState(value.toString());
  useEffect(() => {
    l(value.toString());
  }, [value]);

  return (
    <NumericInput
      value={r}
      onValueChange={(e, t) => {
        // console.log('e, t', e, t);
        l(t), Number.isNaN(e) || onValueChange(e);
      }}
      {...option}
    ></NumericInput>
  );
};

// 文字间距
export const TextSpacing = observer(({ elements, store }: InputProps) => {
  const n = elements[0];
  // 设置字体数据
  const a = (n) => {
    elements.forEach((e) => {
      store.setElement(e, n);
    });
  };
  // 字行高
  const r = 'number' == typeof n.lineHeight ? 100 * n.lineHeight : 120;

  return (
    <Popover
      content={
        <div style={{ padding: '13px', width: '230px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '5px',
              paddingBottom: '5px',
            }}
          >
            <div>{getName('toolbar.lineHeight')}</div>
            <div>
              <NumberInput
                value={Math.round(r)}
                onValueChange={(e) => {
                  a({ lineHeight: e / 100 });
                }}
                style={{ width: '50px' }}
                min={50}
                max={250}
                buttonPosition="none"
              ></NumberInput>
            </div>
          </div>
          <Slider
            value={Math.round(r)}
            onChange={(e) => {
              a({ lineHeight: e / 100 });
            }}
            min={50}
            max={250}
            stepSize={1}
            showTrackFill={false}
            labelRenderer={false}
          ></Slider>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '5px',
              paddingBottom: '5px',
            }}
          >
            <div>{getName('toolbar.letterSpacing')}</div>
            <div>
              <NumberInput
                value={Math.round(n.charSpacing)}
                onValueChange={(e) => {
                  a({ charSpacing: e });
                }}
                style={{ width: '50px' }}
                min={-50}
                max={250}
                buttonPosition="none"
              ></NumberInput>
            </div>
          </div>
          <Slider
            value={Math.round(n.charSpacing)}
            onChange={(e) => {
              a({ charSpacing: e });
            }}
            min={-50}
            max={250}
            stepSize={1}
            showTrackFill={false}
            labelRenderer={false}
          ></Slider>
        </div>
      }
      position={Position.BOTTOM}
    >
      <Button icon="properties" minimal={true}></Button>
    </Popover>
  );
});

const PROPS_MAP = {
  TextFontFamily: TextFontFamily,
  TextFontSize: TextFontSize,
  TextFontVariant: TextFontVariant,
  TextFill: TextFill,
  TextSpacing: TextSpacing,
  TextFilters: FiltersPicker,
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
