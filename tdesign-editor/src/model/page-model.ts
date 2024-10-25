import { types, getParentOfType, Instance, getSnapshot } from 'mobx-state-tree';
import { ElementTypes, TYPES_MAP } from './group-model';
import { Store } from './store';
import { nanoid } from 'nanoid';

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
    addElement(element, { skipSelect = false } = {}) {
      // 查找元素类型对应的模型
      const modelType = TYPES_MAP[element.type];
      if (!modelType) {
        console.error('Can not find model with type ' + element.type);
        return;
      }

      const obj = modelType.create(Object.assign({ id: nanoid(10) }, element));
      // 往数据树添加一个元素
      self.objects.push(obj);

      // 看是否要聚焦新创建的对象
      if (!skipSelect) {
        self.store.selectElements([obj.id]);
      }

      // 需要用fabric.canvas添加对象进去
      console.log('obj', obj);

      // 返回创建的新对象
      return obj;
    },
  }));

export type PageType = Instance<typeof Page>;
