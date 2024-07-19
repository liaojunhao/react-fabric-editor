import { types, getParentOfType, Instance, getSnapshot } from 'mobx-state-tree';
import { ElementTypes } from './group-model';
import { Store } from './store';

export const Page = types
  .model('Page', {
    id: types.identifier,
    objects: types.array(types.late(() => ElementTypes)),
    width: types.optional(types.union(types.number, types.literal('auto')), 'auto'),
    height: types.optional(types.union(types.number, types.literal('auto')), 'auto'),
    background: '#fff',
    stroke: 'lightgrey',
    bleed: 0,
    custom: types.frozen(),
    _exporting: !1,
    _rendering: !1,
  })
  .views((self) => ({
    get store() {
      return getParentOfType(self, Store);
    },
    get _exportingOrRendering() {
      return self._exporting || self._rendering;
    },
  }))
  .views((self) => ({
    get computedWidth() {
      return 'auto' === self.width ? self.store.width : self.width;
    },
    get computedHeight() {
      return 'auto' === self.height ? self.store.height : self.height;
    },
  }))
  .actions((self) => ({
    toJSON: () => JSON.parse(JSON.stringify(getSnapshot(self))),
  }))
  .actions((self) => ({
    setZIndex(t) {
      self.store.setPageZIndex(self.id, t);
    },
    set(t) {
      if (t.stroke) {
        // console.log(t, self.custom);
        self.custom?.workareaHandler?.set({
          stroke: t.stroke,
        });
      }
      Object.assign(self, t);
    },
    select() {
      self.store.selectPage(self.id);
    },
  }));

export type PageType = Instance<typeof Page>;
