import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@blueprintjs/core';
import { getName } from '../utils/l10n';
import { StoreType } from '../model/store';
import { Popover, Position, Switch, Slider, Alignment, NumericInput } from '@blueprintjs/core';
import { LeftJoin } from '@blueprintjs/icons';
import ColorPicker from './color-picker';

const limit = (e, t, a) => Math.max(t, Math.min(a, e));

export const NumberInput = ({ value, onValueChange, ...option }) => {
  const [l, r] = useState(value.toString());
  useEffect(() => {
    r(value.toString());
  }, [value]);
  return (
    <NumericInput
      value={l}
      onValueChange={(e, t) => {
        r(t), Number.isNaN(e) || onValueChange(e);
      }}
      {...option}
    ></NumericInput>
  );
};

const EnablerNumberInput = ({
  label,
  enabled,
  visible = !0,
  onEnabledChange,
  numberValue,
  onNumberValueChange,
  min,
  max,
}) => {
  return visible ? (
    <>
      <Switch
        checked={enabled} // 传递value给受控组件的 不应为undefined或null
        label={label}
        onChange={(e) => {
          onEnabledChange(e.target.checked);
        }}
        alignIndicator={Alignment.RIGHT}
        style={{ marginTop: 20 }}
      ></Switch>
      {enabled && (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <div style={{ paddingTop: '7px' }}>
            <Slider
              value={numberValue}
              onChange={(e) => {
                onNumberValueChange(e);
              }}
              min={min}
              max={max}
              labelStepSize={50}
              showTrackFill={false}
              labelRenderer={false}
            ></Slider>
          </div>
          <NumericInput
            value={numberValue}
            onValueChange={(e) => {
              onNumberValueChange(limit(e, min, max));
            }}
            buttonPosition="none"
            style={{ width: '45px', padding: '0 5px', marginLeft: '10px' }}
            min={min}
            max={max}
          ></NumericInput>
        </div>
      )}
    </>
  ) : null;
};

interface Props {
  elements?: Array<any>;
  element?: any;
  store: StoreType;
}
export const FiltersPicker: React.FC<Props> = observer(({ element, store, elements }) => {
  const n = elements || [element]; // [element]没有响应式
  const l = n[0];
  // 文字、图片、svg、的特效都在这边制作
  const r = 'textbox' === l.type;
  const o = 'image' === l.type;
  const i = 'svg' === l.type;
  const c = o || i;

  // 设置属性
  const d = (e) => {
    n.forEach((t) => {
      store.setElement(t, e);
    });
  };

  return (
    <Popover
      position={Position.BOTTOM}
      content={
        <div
          style={{
            padding: '15px',
            paddingTop: '15px',
            width: '230px',
            maxHeight: 'calc(100vh - 150px)',
            overflow: 'auto',
          }}
        >
          {
            // 模糊
            o && (
              <EnablerNumberInput
                label={getName('toolbar.blur')}
                enabled={l.blurEnabled || false}
                visible={o}
                onEnabledChange={(e) => {
                  d({ blurEnabled: e });
                }}
                numberValue={l.blurRadius || 0}
                onNumberValueChange={(e) => {
                  d({ blurRadius: e });
                }}
                min={0}
                max={100}
              ></EnablerNumberInput>
            )
          }
          {
            // 描边
            r && (
              <Switch
                checked={!!l.stroke}
                label={getName('toolbar.textStroke')}
                onChange={(e) => {
                  d({ stroke: e.target.checked ? '#000' : null });
                }}
                alignIndicator={Alignment.RIGHT}
                style={{ marginTop: 20 }}
              ></Switch>
            )
          }
          {
            // 描边
            r && !!l.stroke && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ColorPicker
                    value={l.stroke}
                    size={30}
                    onChange={(e) => {
                      d({ stroke: e });
                    }}
                    store={store}
                  ></ColorPicker>
                  <NumericInput
                    defaultValue={l.strokeWidth}
                    onValueChange={(e) => {
                      d({ strokeWidth: limit(e, 1, 30) });
                    }}
                    style={{ width: '80px' }}
                    min={1}
                    max={Math.round(l.fontSize / 2)}
                  ></NumericInput>
                </div>
              </>
            )
          }
          <Switch
            checked={!!l.shadowEnabled}
            label={getName('toolbar.shadow')}
            onChange={(e) => {
              d({ shadowEnabled: e.target.checked });
            }}
            alignIndicator={Alignment.RIGHT}
            style={{ marginTop: 20 }}
          ></Switch>
          {l.shadowEnabled && (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '5px',
                  paddingBottom: '5px',
                }}
              >
                <div>{getName('toolbar.blur')}</div>
                <div>
                  <NumberInput
                    value={l.shadow.blur}
                    onValueChange={(e) => {
                      d({ shadowBlur: limit(e, -50, 50) });
                    }}
                    style={{ width: 50 }}
                    min={0}
                    max={50}
                    buttonPosition="none"
                  ></NumberInput>
                </div>
              </div>
              <Slider
                value={l.shadow.blur}
                onChange={(e) => {
                  d({ shadowBlur: e });
                }}
                min={0}
                max={50}
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
                <div>{getName('toolbar.offsetX')}</div>
                <div>
                  <NumberInput
                    value={l.shadow.offsetX}
                    onValueChange={(e) => {
                      d({ shadowOffsetX: limit(e, -50, 50) });
                    }}
                    style={{ width: 50 }}
                    min={-50}
                    max={50}
                    buttonPosition="none"
                  ></NumberInput>
                </div>
              </div>
              <Slider
                value={l.shadow.offsetX}
                onChange={(e) => {
                  d({ shadowOffsetX: e });
                }}
                min={-50}
                max={50}
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
                <div>{getName('toolbar.offsetY')}</div>
                <div>
                  <NumberInput
                    value={l.shadow.offsetY}
                    onValueChange={(e) => {
                      d({ shadowOffsetY: limit(e, -50, 50) });
                    }}
                    style={{ width: 50 }}
                    min={-50}
                    max={50}
                    buttonPosition="none"
                  ></NumberInput>
                </div>
              </div>
              <Slider
                value={l.shadow.offsetY}
                onChange={(e) => {
                  d({ shadowOffsetY: e });
                }}
                min={-50}
                max={50}
                showTrackFill={false}
                labelRenderer={false}
              ></Slider>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '5px', paddingBottom: '5px' }}
              >
                <div style={{ lineHeight: '30px' }}>{getName('toolbar.color')}</div>
                <ColorPicker
                  value={l.shadow.color}
                  size={30}
                  onChange={(e) => {
                    d({ shadowColor: e });
                  }}
                  store={store}
                ></ColorPicker>
              </div>
            </>
          )}
        </div>
      }
    >
      <Button minimal={true} icon={<LeftJoin />} text={getName('toolbar.effects')}></Button>
    </Popover>
  );
});
