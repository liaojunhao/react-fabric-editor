import React from 'react';
import { StoreType } from '../model/store';
type PageProps = {
  store: StoreType;
  components?: any;
};

const PROPS_MAP = {};

export const TextToolbar: React.FC<PageProps> = ({ store }) => {
  const n = store.selectedElements;
  const keys = ['TextFill', 'TextFontFamily', 'TextFontSize', 'TextFontVariant', 'TextSpacing', 'TextFilters'];

  console.log(n);
  return <div>文字工具栏</div>;
};
