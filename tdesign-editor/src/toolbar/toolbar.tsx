import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreType } from '../model/store';
import styled from 'styled-components';
import { Navbar, Alignment, Divider } from '@blueprintjs/core';

import { HistoryButtons } from './history-buttons';
import { TextToolbar } from './text-toolbar';
import { ImageToolbar } from './image-toolbar';
import { RemoveButton } from './remove-button';
import { DuplicateButton } from './duplicate-button';
import { LockButton } from './lock-button';
import { OpacityPicker } from './opacity-picker';
import { PositionPicker } from './position-picker';
import { GroupButton } from './group-button';
import { DownloadButton } from './download-button';
import { CommonToolbar } from './common-toolbar';

const ComponentsTypes = {
  textbox: TextToolbar,
  image: ImageToolbar,
  // 默认的工具栏
  common: CommonToolbar,
};

export function registerToolbarComponent(e, t) {
  ComponentsTypes[e] = t;
}

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

type ToolbarProps = {
  store: StoreType;
  downloadButtonEnabled?: boolean;
  components?: any;
};
export const Toolbar: React.FC<ToolbarProps> = observer(({ store, downloadButtonEnabled, components = {} }) => {
  if (!store) {
    return <div>没有传入或注册 store 对象无法初始化 Toolbar 组件</div>;
  }
  // 是否选中的都是相同的元素
  const oneType = 1 === new Set(store.selectedElements.map((e) => e.type)).size;
  const isOne = store.selectedElements.length === 1;
  const currentEle = store.selectedElements[0];
  const isCropMode = isOne && currentEle._cropModeEnabled;
  let CurrentToolbar = isOne && ComponentsTypes[currentEle?.type];

  if (oneType && currentEle?.type === 'textbox') {
    CurrentToolbar = ComponentsTypes[currentEle?.type];
  } else if (store.selectedElements.length > 1) {
    // 多个元素的时候
    // CurrentToolbar = ComponentsTypes.many
  } else if (0 === store.selectedElements.length) {
    // 没有选中的时候
    CurrentToolbar = ComponentsTypes.common;
  }
  const _ = useRef(components);
  const s = _.current;

  const RenderActionControls = s.ActionControls || downloadButtonEnabled ? DownloadButton : null;
  const RenderRemoveButton = s.Remove || RemoveButton;
  const RenderDuplicateButton = s.Duplicate || DuplicateButton;
  const RenderLockButton = s.Lock || LockButton;
  const RenderOpacityPicker = s.Opacity || OpacityPicker;
  const RenderPositionPicker = s.Position || PositionPicker;
  const RenderGroupButton = s.Group || GroupButton;

  return (
    <NavbarContainer className="bp5-navbar tdesign-toolbar">
      <NavInner>
        {!isCropMode && <HistoryButtons store={store}></HistoryButtons>}
        {CurrentToolbar && <CurrentToolbar store={store} components={s}></CurrentToolbar>}
        {!isCropMode && (
          <Navbar.Group align={Alignment.RIGHT} style={{ gap: 5 }}>
            <RenderGroupButton store={store}></RenderGroupButton>
            <RenderPositionPicker store={store}></RenderPositionPicker>
            <RenderOpacityPicker store={store}></RenderOpacityPicker>
            <RenderLockButton store={store}></RenderLockButton>
            <RenderDuplicateButton store={store}></RenderDuplicateButton>
            <RenderRemoveButton store={store}></RenderRemoveButton>
            {RenderActionControls && (
              <>
                <Divider style={{ height: '100%', margin: '0 15px' }} />
                <RenderActionControls store={store}></RenderActionControls>
              </>
            )}
          </Navbar.Group>
        )}
      </NavInner>
    </NavbarContainer>
  );
});
