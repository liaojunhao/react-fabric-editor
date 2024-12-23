import { types, Instance, onSnapshot, getSnapshot } from 'mobx-state-tree';
import Handlers from '../canvas/handlers';
import { isEqual } from 'lodash-es';
import { validateKey } from '../utils/validate-key';
import { debounce } from 'lodash-es';

const updataFn = debounce((callback, objs) => {
  callback(objs);
}, 1000);

// 目前有的元素类型
const TYPES_MAP = {
  textbox: true,
  image: true,
  group: true,
  rect: true,
};

export const Store = types
  .model('Store', {
    openedSidePanel: 'text',
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
      return !updata
        ? self.selectedElementsIds
            .map((t) => {
              for (const i of self.handler.canvas.getObjects()) if (i.id === t) return i;
            })
            .filter((e) => !!e)
        : self.selectedElementsIds
            .map((t) => {
              for (const i of self.handler.canvas.getObjects()) if (i.id === t) return i;
            })
            .filter((e) => !!e);
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
      return self.handler.canvas.getObjects().find((item) => item.id === id);
    },
  }))
  .actions((self) => ({
    /**
     * 内部处理的api
     */
    updateObjects() {
      if (self.handler) {
        const _objects = self.handler.canvas.getObjects().map((item) => {
          return item.toJSON(self.handler.propertiesToInclude);
        });
        self.objects.replace(_objects);
      }
    },
    setRandomUpdata(val) {
      self.randomUpdata = val;
    },
    setHandler(handler) {
      self.handler = handler;
    },
    /**
     * 对外公开的api
     */
    // 选择的元素
    selectElements(ids) {
      const els = ids
        .map((id) => self.getElementById(id))
        .filter((e) => !!e)
        .map((e) => e.id);
      self.selectedElementsIds = els;
    },
    // 打开标尺
    toggleRulers() {},
    // 打开左侧面板
    openSidePanel(t) {
      if (self.openedSidePanel !== t) {
        self.openedSidePanel = t;
      }
    },
    // 设置缩放值
    setScale(t) {
      self.handler.workareaHandlers.setZoomAuto(t);
      self.scale = t;
    },
    // 设置1比1
    _setScaleToFit(t) {
      self.scaleToFit = t;
    },
    // 修改尺寸
    setSize(width: number, height: number, useMagic?: boolean) {
      if (self.handler) {
        self.handler.workareaHandlers.setSize(width, height);
      }
    },
    // 成组
    groupElements() {},
    // 解组
    ungroupElements() {},
    // 删除元素
    deleteElements() {
      if (self.handler) {
        self.handler.remove();
      }
    },
    // 克隆元素
    duplicates() {
      if (self.handler) {
        self.handler.duplicate();
      }
    },
    // 监听画布的变化
    on(event: string, callback: (e) => void) {
      if ('change' === event) {
        let beforeObjects = getSnapshot(self.objects);

        return onSnapshot(self.objects, (objects) => {
          const afterObjects = objects;
          // 深度对比有数据不一样才去做变化
          if (!isEqual(beforeObjects, afterObjects)) {
            beforeObjects = afterObjects;
            // 保存的时候做下防抖
            // callback(afterObjects);
            updataFn(callback, afterObjects);
          }
        });
      }
    },
    // 导出JSON
    toJSON() {},
    // 加载数据
    loadJSON() {},
    // 清楚画布
    clear() {},
    // 添加字体
    addFont() {},
    // 删除字体
    removeFont() {},
    // 加载字体
    loadFont() {},
  }))
  .actions((self) => ({
    // 添加元素
    async addElement(obj, { skipSelect = false, centered = false }) {
      if (self.handler) {
        // 先看有没有这个类型
        const fabricObject = TYPES_MAP[obj.type];
        if (!fabricObject) return void console.error('Can not find model with type ' + obj.type);
        // 在创建这个数据（会默认加 name）
        const element = Object.assign({ name: `new_${obj.type}` }, obj);
        // 渲染层的选择
        const ele = await self.handler.addElement(element, { skipSelect, centered });
        // 数据层的选择
        ele && !skipSelect && self.selectElements([ele.id]);
        return ele;
      } else {
        console.error('没有注册 handler');
      }
    },
    // 设置元素属性
    setElement(target, option) {
      if (self.handler) {
        self.handler.setElement(target, option);
      } else {
        console.error('没有注册 handler');
      }
    },
    // 修改工作区颜色
    setWorkspaseBg(color: string) {
      if (self.handler) {
        self.handler.workareaHandlers.setWorkspaseBg(color);
      } else {
        console.error('没有注册 handler');
      }
    },
  }))
  .actions((self) => ({
    // 解析psd
    insertPSD(files: File) {
      if (self.handler) {
        self.handler.psdHandlers.insertPSD(files, () => {
          console.log('解析psd');
        });
      } else {
        console.error('没有注册 handler');
      }
    },
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
