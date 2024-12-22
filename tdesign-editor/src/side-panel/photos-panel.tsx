import React from 'react';
import { observer } from 'mobx-react-lite';
import { StoreType } from '../model/store';

export const PhotosPanel = observer(({ store }: { store: StoreType }) => {
  return <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>图片</div>;
});
