import React from 'react';
import { observer } from 'mobx-react-lite';
import { StoreType } from '../model/store';

export const TemplatesPanel = observer(({ store }: { store: StoreType }) => {
  return <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>公共模板</div>;
});
