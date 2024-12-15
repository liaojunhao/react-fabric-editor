import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreType } from '../model/store';
import styled from 'styled-components';

import { HistoryButtons } from './history-buttons';
import { TextToolbar } from './text-toolbar';

const NavbarContainer = styled.div`
  white-space: nowrap;
  z-index: 1;
  & .bp5-button:has(.bp5-button-text) {
    min-width: max-content;
  }
`;

const NavInner = styled.div`
  width: 100%;
  height: 100%;
`;

const ComponentsTypes = {
  textbox: TextToolbar,
};

export function registerToolbarComponent(e, t) {
  ComponentsTypes[e] = t;
}

type ToolbarProps = {
  store: StoreType;
  downloadButtonEnabled?: boolean;
  components?: any;
};
export const Toolbar: React.FC<ToolbarProps> = observer(({ store, components = {} }) => {
  if (!store) {
    return <div>没有传入或注册 store 对象无法初始化 Toolbar 组件</div>;
  }
  // 是否选中的都是相同的元素
  const oneType = 1 === new Set(store.selectedElements.map((e) => e.type)).size;
  // console.log(oneType);
  const isOne = store.selectedElements.length === 1;
  const currentEle = store.selectedElements[0];
  // n = e.selectedElements.every((e) => e.styleEditable);
  let CurrentToolbar = isOne && ComponentsTypes[currentEle?.type];
  // let i = n && l && ComponentsTypes[a.type];
  if (oneType && currentEle?.type === 'textbox') {
    CurrentToolbar = ComponentsTypes[currentEle?.type];
  } else {
    if (store.selectedElements.length > 1) {
      // 多个不同的元素就现实 ManyToolbar
    }
  }
  const _ = useRef(components);
  const s = _.current;

  return (
    <NavbarContainer className="bp5-navbar tdesign-toolbar">
      <NavInner>
        <HistoryButtons store={store}></HistoryButtons>
        {CurrentToolbar && <CurrentToolbar store={store} components={s}></CurrentToolbar>}
      </NavInner>
    </NavbarContainer>
  );
});
