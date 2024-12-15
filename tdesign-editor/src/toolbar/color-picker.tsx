import { StoreType } from '../model/store';
import React from 'react';
import { PopoverPosition, Popover } from '@blueprintjs/core';
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
// import Sketch from './sketch';
import { SketchPicker } from 'react-color';

const SolidContainer = styled.div`
  & .sketch-picker {
    padding: 0px !important;
    box-shadow: none !important;
    background: none !important;
  }

  & .flexbox-fix {
    border-top: none !important;
  }

  .bp5-dark & .sketch-picker {
    background-color: #394b59;
  }

  .bp5-dark & .sketch-picker label {
    color: #f5f8fa !important;
  }
`;

const SolidInput = (e) => {
  var { style, color, onChange } = e;
  const [n, l] = useState(color);
  useEffect(() => {
    l(color);
  }, [color]);
  const s = useRef<undefined | number>(),
    i = useRef<undefined | string>();
  return (
    <SolidContainer
      style={style}
      onMouseDown={(e) => {
        //@ts-ignore
        'INPUT' !== e.target.tagName && e.preventDefault();
      }}
    >
      <SketchPicker
        color={n}
        onChange={(e) => {
          const { r: t, g: r, b: a, a: n } = e.rgb,
            c = `rgba(${t},${r},${a},${n})`;
          l(c),
            (i.current = c),
            s.current ||
              (s.current = window.setTimeout(() => {
                (s.current = 0), onChange(c);
              }, 50));
        }}
      />
      {/* <Sketch color={n} style={style} onChange={(e) => {}}></Sketch> */}
    </SolidContainer>
  );
};

const ColoredBox = (e) => {
  let { size = 30, background, style = {}, children = null } = e;
  return (
    <div
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      style={{
        ...{
          width: size + 'px',
          height: size + 'px',
          background:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 8 8'%3E%3Cg fill='rgba(112, 112, 116, 1)' fill-opacity='1'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E\")",
          borderRadius: '2px',
          boxShadow: '0 0 2px grey',
          marginBottom: '-4px',
        },
        ...style,
      }}
    >
      <div style={{ width: size + 'px', height: size + 'px', background: background }}>{children}</div>
    </div>
  );
};

type Props = {
  size?: number;
  onChange: (color: string) => void;
  value: string;
  store: StoreType;
  gradientEnabled?: boolean;
  style?: any;
  children?: any;
  position?: PopoverPosition;
};
export const ColorPicker: React.FC<Props> = ({
  value,
  onChange,
  size,
  store,
  gradientEnabled,
  children,
  style,
  position = 'auto',
}) => {
  return (
    <Popover
      autoFocus={false}
      enforceFocus={true}
      interactionKind="click"
      hasBackdrop={true}
      position={position}
      content={
        gradientEnabled ? (
          <div>渐变</div>
        ) : (
          <div style={{ padding: 5 }}>
            <SolidInput color={value} onChange={onChange}></SolidInput>
          </div>
        )
      }
    >
      <ColoredBox size={size} background={value} style={style}>
        {children}
      </ColoredBox>
    </Popover>
  );
};

export default ColorPicker;
