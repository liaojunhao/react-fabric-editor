import { types } from 'mobx-state-tree';
import { TextElement } from './text-model';

const ADDITIONAL_TYPES = [];
const additionalTypesUnion = [...new Array(20)].map((e, t) => types.late(() => ADDITIONAL_TYPES[t]));

export const forEveryChild = (e, t) => {
  if (e.objects) {
    for (const r of e.objects) {
      if (!0 === t(r)) break;
      forEveryChild(r, t);
    }
  }
};

export const TYPES_MAP = {
  textbox: TextElement,
};

export const ElementTypes = types.union(
  {
    dispatcher: (e) => {
      const t = TYPES_MAP[e.type];
      if (!t) throw new Error(`Unknown element type: "${e.type}"`);
      return t;
    },
  },
  TextElement,
  ...additionalTypesUnion,
);
