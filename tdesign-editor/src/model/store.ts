import { types, Instance } from 'mobx-state-tree';
import { nanoid } from 'nanoid';

export const forEveryChild = (e, t) => {
  if (e.objects) {
    for (const r of e.objects) {
      if (!0 === t(r)) break;
      forEveryChild(r, t);
    }
  }
};

// 目前有的元素类型
const TYPES_MAP = {
  textbox: true,
  image: true,
  group: true,
  rect: true,
};

export const Store = types
  .model('Store', {
    openedSidePanel: '',
    width: 1080,
    height: 1080,
    scale: 1,
    scaleToFit: 1,
    unit: 'px',
    dpi: 72,
    custom: types.frozen(),
    selectedElementsIds: types.array(types.string),
    handler: types.frozen(),
    objects: types.array(types.frozen()), // 画布所有的元素
  })
  .views((self) => ({
    get selectedElements() {
      return self.selectedElementsIds
        .map((t) => {
          for (const i of self.handler.objects) if (i.id === t) return i;
        })
        .filter((e) => !!e);
    },
    get selectedShapes() {
      const t = [];
      return t;
    },
  }))
  .actions((self) => ({
    setHandler(handler) {
      self.handler = handler;
    },
    openSidePanel(t) {
      if (self.openedSidePanel !== t) {
        self.openedSidePanel = t;
      }
    },
    selectElements(t) {
      console.log(t);
    },
  }))
  .actions((self) => {
    return {
      addElement(obj, { skipSelect = false, centered = true }) {
        // 先看有没有这个类型
        const n = TYPES_MAP[obj.type];
        if (!n) return void console.error('Can not find model with type ' + obj.type);
        // 在创建这个数据
        const element = Object.assign({ id: nanoid(10) }, obj);
        // 渲染层的选择
        const ele = self.handler.addObject(element, { skipSelect, centered });
        // 数据层的选择
        !skipSelect && self.selectElements([ele.id]);
        return ele;
      },
    };
  });

export type StoreType = Instance<typeof Store>;

export interface StoreProps {
  key: string;
}
export function createStore(props?: StoreProps) {
  return Store.create();
}
export default createStore;
