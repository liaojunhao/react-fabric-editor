import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@blueprintjs/core';
import { getName } from '../utils/l10n';
import { StoreType } from '../model/store';
import { Popover, Position } from '@blueprintjs/core';
import { LeftJoin } from '@blueprintjs/icons';

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
  return visible ? <div></div> : null;
};

interface Props {
  elements?: Array<any>;
  element?: any;
  store: StoreType;
}
export const FiltersPicker: React.FC<Props> = observer(({ element, store, elements }) => {
  const n = elements || [element];
  const l = n[0];
  console.log('l.type ---> ', l.type);
  // 文字、图片、svg、的特效都在这边制作
  const r = 'textbox' === l.type;
  const o = 'image' === l.type;
  const i = 'svg' === l.type;
  const c = o || i;
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
          <EnablerNumberInput label={getName('toolbar.blur')}></EnablerNumberInput>
        </div>
      }
    >
      <Button minimal={true} icon={<LeftJoin />} text={getName('toolbar.effects')}></Button>
    </Popover>
  );
});

// export const EffectsPicker = observer(() => {
//   return <Button text={getName('toolbar.effects')}></Button>;
// });
