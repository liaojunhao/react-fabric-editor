import { types, getParentOfType } from 'mobx-state-tree';
import { ElementTypes } from './group-model';
import { Store } from './store';

export const Page = types
  .model('Page', {
    id: types.identifier,
    children: types.array(types.late(() => ElementTypes)),
    width: types.optional(types.union(types.number, types.literal('auto')), 'auto'),
    height: types.optional(types.union(types.number, types.literal('auto')), 'auto'),
    background: '#fff',
    bleed: 0,
    custom: types.frozen(),
    duration: 5e3,
  })
  .views((self) => ({
    get store() {
      return getParentOfType(self, Store);
    },
  }))
  .views((self) => ({
    get computedWidth() {
      return 'auto' === self.width ? self.store.width : self.width;
    },
    get computedHeight() {
      return 'auto' === self.height ? self.store.height : self.height;
    },
  }));
