import React from 'react';
import { StoreType } from '../model/store';
import { PageType } from '../model/page-model';

type PageControlsProps = {
  store: StoreType;
  page: PageType;
  xPadding: number;
  yPadding: number;
};

const PageControls: React.FC<PageControlsProps> = ({ store, page, xPadding, yPadding }) => {
  const n = store.pages.length > 1;
  const r = store.pages.indexOf(page);
  return (
    <div style={{ position: 'absolute', top: yPadding - 40 + 'px', right: xPadding + 'px' }}>
      <span>Page Controls</span>
      <span
        onClick={() => {
          const bleed = store.activePage?.bleed ?? 0;
          const a = store.addPage({ bleed });
          const n = store.pages.indexOf(page);
          a.setZIndex(n + 1);
        }}
      >
        添加页
      </span>
    </div>
  );
};

export default PageControls;
