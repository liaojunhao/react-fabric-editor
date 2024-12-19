import Handlers from './handlers';
import { fabric } from 'fabric';

// 无参数滤镜
const noParamsFilters = {
  BlackWhite: false,
  Brownie: false,
  Vintage: false,
  Kodachrome: false,
  technicolor: false,
  Polaroid: false,
  Invert: false,
  Sepia: false,
};

// 有参数滤镜
export const paramsFilters = [
  {
    type: 'Brightness',
    status: false,
    params: [
      {
        key: 'brightness',
        value: 0,
        min: -1,
        max: 1,
        step: 0.01,
      },
    ],
  },
  {
    type: 'Contrast',
    status: false,
    params: [
      {
        key: 'contrast',
        value: 0,
        min: -1,
        max: 1,
        step: 0.01,
      },
    ],
  },
  {
    type: 'Saturation',
    status: false,
    params: [
      {
        key: 'saturation',
        value: 0,
        min: -1,
        max: 1,
        step: 0.01,
      },
    ],
  },
  {
    type: 'Vibrance',
    status: false,
    params: [
      {
        key: 'vibrance',
        value: 0,
        min: -1,
        max: 1,
        step: 0.01,
      },
    ],
  },
  {
    type: 'HueRotation',
    status: false,
    params: [
      {
        key: 'rotation',
        value: 0,
        min: -1,
        max: 1,
        step: 0.01,
      },
    ],
  },
  {
    type: 'Noise',
    status: false,
    params: [
      {
        key: 'noise',
        value: 0,
        min: -1,
        max: 1000,
        step: 0.1,
      },
    ],
  },
  {
    type: 'Pixelate',
    status: false,
    params: [
      {
        key: 'blocksize',
        value: 0.01,
        min: 0.01,
        max: 100,
        step: 0.01,
      },
    ],
  },
  {
    type: 'Blur',
    status: false,
    params: [
      {
        key: 'blur',
        value: 0,
        min: 0,
        max: 1,
        step: 0.01,
      },
    ],
  },
  {
    type: 'Grayscale',
    status: false,
    params: [
      {
        key: 'mode',
        value: 'average',
        list: ['average', 'lightness', 'luminosity'],
      },
    ],
  },
  {
    type: 'RemoveColor',
    status: false,
    params: [
      {
        key: 'color',
        value: '',
      },
      {
        key: 'distance',
        value: 0,
        min: 0,
        max: 1,
        step: 0.01,
      },
    ],
  },
];

class FilterHandlers {
  constructor(private handlers: Handlers) {}

  /**
   * 无参数滤镜修改状态
   * @param type
   * @param value
   */
  changeFilters(type, value) {}

  /**
   * 有参数与组合滤镜修改
   * @param type
   * @param value
   */
  changeFiltersByParams(type, value) {
    const activeObject = this.handlers.canvas.getActiveObject() as fabric.Image;
    if (!activeObject) return;

    const filtersAll = [...paramsFilters];
    const moduleInfo = filtersAll.find((item) => item.type === type);
    if (value) {
      moduleInfo.params.forEach((paramsItem) => {
        if (type === 'Blur') {
          const value = activeObject.blurRadius || 0;
          this._changeAttr(type, paramsItem.key, value * paramsItem.step, activeObject);
        }
        if (type === 'Brightness') {
          const value = activeObject.brightness || 0;
          this._changeAttr(type, paramsItem.key, value, activeObject);
        }
      });
    } else {
      this._removeFilter(activeObject, type);
    }
  }

  // 创建滤镜
  _createFilter(sourceImg, type, options = null) {
    let filterObj;
    // capitalize first letter for matching with fabric image filter name
    const fabricType = this._getFabricFilterType(type);
    const ImageFilter = fabric.Image.filters[fabricType];
    if (ImageFilter) {
      filterObj = new ImageFilter(options);
      filterObj.options = options;
      sourceImg.filters.push(filterObj);
    }
    sourceImg.applyFilters();
    this.handlers.canvas.renderAll();
    return filterObj;
  }

  // 设置滤镜值
  _changeAttr(type, key, value, activeObject) {
    const itemFilter = this._getFilter(activeObject, type);
    if (itemFilter) {
      itemFilter[key] = value;
    } else {
      const imgFilter = this._createFilter(activeObject, type);
      imgFilter[key] = value;
    }

    activeObject.applyFilters();
    this.handlers.canvas.renderAll();
  }

  // 删除滤镜
  _removeFilter(sourceImg, type) {
    const fabricType = this._getFabricFilterType(type);
    sourceImg.filters = sourceImg.filters.filter((value) => value.type !== fabricType);
    sourceImg.applyFilters();
    this.handlers.canvas.renderAll();
  }

  _getFabricFilterType(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  _getFilter(sourceImg, type) {
    let imgFilter = null;

    if (sourceImg) {
      const fabricType = this._getFabricFilterType(type);
      const { length } = sourceImg.filters;
      let item, i;

      for (i = 0; i < length; i += 1) {
        item = sourceImg.filters[i];
        if (item.type === fabricType) {
          imgFilter = item;
          break;
        }
      }
    }

    return imgFilter;
  }
}

export default FilterHandlers;
