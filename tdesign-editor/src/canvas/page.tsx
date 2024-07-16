import React from 'react';
import { StoreType } from '../model/store';
import { PageType } from '../model/page-model';

type PageProps = {
  store: StoreType;
  page: PageType;
  xPadding: number;
  yPadding: number;
  width: number;
  height: number;
};
const Page: React.FC<PageProps> = ({ store, page, width, height, xPadding, yPadding }) => {
  console.log(page.toJSON());
  const L = store.activePage === page;
  console.log('L', L);
  return (
    <div
      className={`polotno-page-container ${L ? 'active-page' : ''}`}
      style={{ position: 'relative', width: width + 'px' }}
    >
      页面
    </div>
  );
};

export default Page;
