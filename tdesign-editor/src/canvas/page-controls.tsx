import React from 'react';
import { StoreType } from '../model/store';
import { PageType } from '../model/page-model';
import { Button, Tooltip } from '@blueprintjs/core';
import { getName } from '../utils/l10n';

type PageControlsProps = {
  store: StoreType;
  page: PageType;
  xPadding: number;
  yPadding: number;
};

const PageControls: React.FC<PageControlsProps> = ({ store, page, xPadding, yPadding }) => {
  const n = store.pages.length > 1; // 是否有页面
  const r = store.pages.indexOf(page); // 当前页面的索引
  return (
    <div style={{ position: 'absolute', top: yPadding - 40 + 'px', right: xPadding + 'px' }}>
      <Tooltip content={getName('workspace.addPage')}>
        <Button
          icon="insert"
          minimal={true}
          onClick={() => {
            const bleed = store.activePage?.bleed ?? 0;
            const newPage = store.addPage({ bleed });
            const n = store.pages.indexOf(page);
            newPage.setZIndex(n + 1);
          }}
        />
      </Tooltip>
    </div>
  );
};

export default PageControls;
