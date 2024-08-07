import { types, Instance, getSnapshot, detach } from 'mobx-state-tree';
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
    setPageZIndex(t, i) {
      const a = self.pages.find((e) => e.id === t);
      a && detach(a);
      self.pages.remove(a);
      self.pages.splice(i, 0, a);
    },
    addPage(t) {
      const newPage = Page.create({ id: nanoid(10), ...t });
      self.pages.push(newPage);
      self._activePageId = newPage.id;

      return newPage;
    },
    selectPage(t) {
      self._activePageId = t;
    },
    setScale(t) {
      self.scale = t;
    },
    _setScaleToFit(t) {
      self.scaleToFit = t;
    },
    toJSON() {
      return {
        width: self.width,
        height: self.height,
        pages: getSnapshot(self.pages),
        unit: self.unit,
        dpi: self.dpi,
        custom: self.custom,
      };
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
