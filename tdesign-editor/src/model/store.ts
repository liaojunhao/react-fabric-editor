import { types, Instance } from 'mobx-state-tree';

export interface StoreProps {
  key: string;
  showCredit: boolean;
}
export function createStore() {
  // 创建一个新的 Store 实例
  const storeInstance = Store.create();

  // 返回创建的 Store 实例
  return storeInstance;
}

export const Store = types.model('Store', { openedSidePanel: '' });

export type StoreType = Instance<typeof Store>;

export default createStore;
