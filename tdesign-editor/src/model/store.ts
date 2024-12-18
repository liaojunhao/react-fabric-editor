import { types, Instance, onSnapshot, getSnapshot } from 'mobx-state-tree';
import { nanoid } from 'nanoid';
import Handlers from '../canvas/handlers';
import { isEqual } from 'lodash-es';
import { validateKey } from '../utils/validate-key';

// 目前有的元素类型
const TYPES_MAP = {
  textbox: true,
  image: true,
  group: true,
  rect: true,
};

export const Store = types
  .model('Store', {
    openedSidePanel: 'upload',
    width: 666,
    height: 1000,
    scale: 1,
    scaleToFit: 1,
    unit: 'px',
    dpi: 72,
    custom: types.frozen(),
    fonts: types.array(types.frozen()),
    selectedElementsIds: types.array(types.string),
    randomUpdata: 1,
    handler: types.frozen<Handlers>(),
    objects: types.array(types.frozen()),
  })
  .views((self) => ({
    get children() {
      this.updateObjects();
      return self.randomUpdata;
    },
    get selectedElements() {
      const updata = self.randomUpdata === 0 ? 1 : self.randomUpdata;
      return (
        !updata ||
        self.selectedElementsIds
          .map((t) => {
            //@ts-expect-error
            for (const i of self.handler.canvas.getObjects()) if (i.id === t) return i;
          })
          .filter((e) => !!e)
      );
    },
    get selectedShapes() {
      const t = [];
      for (const item of this.selectedElements) {
        if (item) {
          item?.type !== 'group' && t.push(item);
          item?.type === 'group' && t.push(...item.objects);
        }
      }

      return t;
    },
    getElementById(id) {
      //@ts-expect-error
      return self.handler.canvas.getObjects().find((item) => item.id === id);
    },
  }))
  .actions((self) => ({
    updateObjects() {
      if (self.handler) {
        const _objects = self.handler.canvas.getObjects().map((item) => {
          return item.toObject(self.handler.propertiesToInclude);
        });
        self.objects.replace(_objects); // 使用 replace 方法更新数组
      }
    },
    setRandomUpdata(val) {
      self.randomUpdata = val;
    },
    setObjects(objs) {
      self.objects = objs;
    },
    setHandler(handler) {
      self.handler = handler;
    },
    openSidePanel(t) {
      if (self.openedSidePanel !== t) {
        self.openedSidePanel = t;
      }
    },
    selectElements(ids) {
      const els = ids
        .map((id) => self.getElementById(id))
        .filter((e) => !!e)
        .map((e) => e.id);
      self.selectedElementsIds = els;
    },
  }))
  .actions((self) => ({
    // 添加元素
    async addElement(obj, { skipSelect = false, centered = false }) {
      // 先看有没有这个类型
      const fabricObject = TYPES_MAP[obj.type];
      if (!fabricObject) return void console.error('Can not find model with type ' + obj.type);
      // 在创建这个数据
      const _id = nanoid(10);
      const element = Object.assign({ id: _id, name: `${_id}_${obj.type}` }, obj);
      // 渲染层的选择
      const ele = await self.handler.addElement(element, { skipSelect, centered });
      // 数据层的选择
      ele && !skipSelect && self.selectElements([ele.id]);
      return ele;
    },
    // 设置元素属性
    setElement(target, option) {
      self.handler.setElement(target, option);
    },
    // 修改工作区颜色
    setWorkspaseBg(color: string) {
      self.handler.workareaHandlers.setWorkspaseBg(color);
    },
    // 修改工作区大小
    setSize(width: number, height: number) {
      self.handler.workareaHandlers.setSize(width, height);
    },
  }))
  .actions((self) => ({
    // 解析psd
    insertPSD(files: File) {
      self.handler.psdHandlers.insertPSD(files, () => {
        console.log('解析psd');
      });
    },
  }))
  .actions((self) => ({
    on(event: string, callback: (e) => void) {
      if ('change' === event) {
        let beforeObjects = getSnapshot(self.objects);

        return onSnapshot(self.objects, (objects) => {
          const afterObjects = objects;
          // 深度对比有数据不一样才去做变化
          if (!isEqual(beforeObjects, afterObjects)) {
            beforeObjects = afterObjects;
            if (afterObjects.length === 1) return;
            callback(afterObjects);
          }
        });
      }
    },
    toJSON() {},
    loadJSON() {},
  }));

export type StoreType = Instance<typeof Store>;

export interface StoreProps {
  key?: string;
  showCredit?: boolean;
}
export function createStore(props?: StoreProps) {
  const _store = Store.create();
  validateKey(props?.key, props?.showCredit);
  return _store;
}
export default createStore;
