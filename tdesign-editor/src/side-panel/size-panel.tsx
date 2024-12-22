import React from 'react';
import { observer } from 'mobx-react-lite';
import { StoreType } from '../model/store';

export const SizePanel = observer(({ store }: { store: StoreType }) => {
  return <div style={{ height: '100%', overflow: 'auto', paddingRight: '3px' }}>尺寸调整</div>;
});
