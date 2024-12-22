import React from 'react';
import { Popover, Tooltip, Button, Position, Slider, NumericInput } from '@blueprintjs/core';
import { observer } from 'mobx-react-lite';
import { StoreType } from '../model/store';
import { getName } from '../utils/l10n';
import { WaterLevel } from '@icon-park/react';

export const OpacityPicker = observer(({ store }: { store: StoreType }) => {
  const isElement = store.selectedShapes.length > 0;
  const element = store.selectedShapes[0]; // 取里面第一个元素的值来做初始值
  const opacityValue = Math.round(100 * (element ? element.opacity : 0));

  const set = (t) => {
    t = Math.max(0, Math.min(t, 100));
    store.selectedShapes.forEach((e) => {
      store.setElement(e, { opacity: t / 100 });
    });
  };
  return (
    <Popover
      disabled={!isElement}
      position={Position.BOTTOM}
      minimal={false}
      content={
        <div style={{ padding: '10px 20px' }}>
          <div style={{ textAlign: 'center' }}>{getName('toolbar.transparency')}</div>
          <div style={{ display: 'flex' }}>
            <div style={{ paddingTop: '8px', paddingRight: '20px' }}>
              <Slider value={opacityValue} labelRenderer={false} min={0} max={100} onChange={set}></Slider>
            </div>
            <NumericInput
              value={opacityValue}
              onValueChange={set}
              min={0}
              max={100}
              buttonPosition="none"
              style={{ width: 50 }}
              selectAllOnFocus={true}
            ></NumericInput>
          </div>
        </div>
      }
    >
      <Tooltip content={getName('toolbar.transparency')} position={Position.BOTTOM} disabled={!isElement}>
        <Button
          minimal={true}
          icon={<WaterLevel theme="filled" size={18} className="bp5-icon" strokeWidth={6} />}
          disabled={!isElement}
        ></Button>
      </Tooltip>
    </Popover>
  );
});
