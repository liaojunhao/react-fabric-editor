import React from 'react';
import { observer } from 'mobx-react-lite';
import { StoreType } from '../model/store';

export const LayersPanel = observer(({ store }: { store: StoreType }) => {
  return <div style={{ height: '100%', overflow: 'auto' }}>图层</div>;
});
