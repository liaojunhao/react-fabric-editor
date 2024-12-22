import React from 'react';
import { observer } from 'mobx-react-lite';
import { StoreType } from '../model/store';

export const BackgroundPanel = observer(({ store }: { store: StoreType }) => {
  return <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>背景面板</div>;
});
