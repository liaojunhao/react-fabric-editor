import { types, Instance, getSnapshot, detach, cast } from 'mobx-state-tree';
import { Page } from './page-model';
import { nanoid } from 'nanoid';
import { forEveryChild } from '../model/group-model';

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
    // 选择的元素ids
    selectedElementsIds: types.array(types.string),
    _elementsPixelRatio: 2,
    _activePageId: '',
  })
  .views((self) => ({
    get _bleedVisible() {
      console.warn('store._bleedVisible is deprecated. Please use store.bleedVisible instead.');
      return self.bleedVisible;
    },
    // 里面的元素
    get selectedElements() {
      return self.selectedElementsIds
        .map((t) => {
          for (const i of self.pages) for (const e of i.objects) if (e.id === t) return e;
        })
        .filter((e) => !!e);
    },
    get children() {
      return self.pages;
    },
    get activePage() {
      return self.pages.slice().find((t) => t.id === self._activePageId) || (self.pages.length ? self.pages[0] : null);
    },
    find(t) {
      let i;

      forEveryChild({ objects: self.pages }, (e) => {
        if (!i && t(e)) {
          i = e;
          return true;
        }
      });

      return i;
    },
    //@ts-ignore
    getElementById: (t) => self.find((e) => e.id === t),
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
    openSidePanel(t) {
      if (self.openedSidePanel !== t) {
        self.openedSidePanel = t;
      }
    },
    selectElements(t) {
      const i = t
        .map((t) => self.getElementById(t))
        .sort((e, t) => e.page.objects.indexOf(e) - e.page.objects.indexOf(t))
        .filter((e) => !!e)
        .map((e) => e.id);
      self.selectedElementsIds = cast(i);
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
