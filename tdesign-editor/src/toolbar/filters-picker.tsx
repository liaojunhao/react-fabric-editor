import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@blueprintjs/core';
import { getName } from '../utils/l10n';
import { StoreType } from '../model/store';
import { Popover, Position, Switch, Slider, Alignment, NumericInput } from '@blueprintjs/core';
import { LeftJoin } from '@blueprintjs/icons';
import ColorPicker from './color-picker';

const limit = (e, t, a) => Math.max(t, Math.min(a, e));
const NumberInput = () => <div>1</div>;

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
  // console.log('numberValue ---> ', numberValue);
  // console.log('label ===> ', label);
  // console.log('enabled', enabled);
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
      {
        // open
        enabled && (
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
          </div>
        )
      }
    </>
  ) : null;
};

interface Props {
  elements?: Array<any>;
  element?: any;
  store: StoreType;
}
export const FiltersPicker: React.FC<Props> = observer(({ element, store, elements }) => {
  const n = elements || [element];
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

  console.log('l', l);

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
          {o && (
            <EnablerNumberInput
              label={getName('toolbar.blur')}
              enabled={l.blurEnabled || false}
              visible={c || r}
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
          )}
          {r && (
            <Switch
              checked={!!l.stroke}
              label={getName('toolbar.textStroke')}
              onChange={(e) => {
                d({ stroke: e.target.checked ? '#000' : null });
              }}
              alignIndicator={Alignment.RIGHT}
              style={{ marginTop: 20 }}
            ></Switch>
          )}
          {r && !!l.stroke && (
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
          )}
        </div>
      }
    >
      <Button minimal={true} icon={<LeftJoin />} text={getName('toolbar.effects')}></Button>
    </Popover>
  );
});
