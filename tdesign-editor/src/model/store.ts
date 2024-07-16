import { types, Instance } from 'mobx-state-tree';
import { Page } from './page-model';
import { nanoid } from 'nanoid';

export interface StoreProps {
  key: string;
  showCredit: boolean;
}

export const Store = types
  .model('Store', {
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
  })
  .views((self) => ({
    get activePage() {
      return self.pages.slice().find((t) => t.id === self._activePageId) || (self.pages.length ? self.pages[0] : null);
    },
  }))
  .actions((self) => ({
    addPage(t) {
      const newPage = Page.create({ id: nanoid(10), ...t });
      self.pages.push(newPage);
      self._activePageId = newPage.id;

      // 初始化一个画布

      return newPage;
    },
    setScale(t) {
      self.scale = t;
    },
    _setScaleToFit(t) {
      self.scaleToFit = t;
    },
  }));

export type StoreType = Instance<typeof Store>;

export function createStore() {
  // 创建一个新的 Store 实例
  const storeInstance = Store.create();

  // 返回创建的 Store 实例
  return storeInstance;
}
export default createStore;
