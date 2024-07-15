import { types, Instance } from 'mobx-state-tree';
import { Page } from './page-model';

export interface StoreProps {
  key: string;
  showCredit: boolean;
}

export const Store = types.model('Store', {
  openedSidePanel: '',
  pages: types.array(types.late(() => Page)),
  width: 1080,
  height: 1080,
  scale: 1,
  scaleToFit: 1,
  unit: 'px',
  dpi: 72,
  bleedVisible: false,
  rulesVisible: false,
  custom: types.frozen(),
  selectedElementsIds: types.array(types.string),
  _activePageId: '',
});

export type StoreType = Instance<typeof Store>;

export function createStore() {
  // 创建一个新的 Store 实例
  const storeInstance = Store.create();

  // 返回创建的 Store 实例
  return storeInstance;
}
export default createStore;
