import React, { useRef } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { SectionTab } from './tab-button';
import { getName } from '../utils/l10n';
import { Icon } from '@blueprintjs/core';

import TextPanel from './text-panel';

export const TextSection = {
  name: 'text',
  Tab: observer((props) => {
    return (
      <SectionTab {...{ name: getName('sidePanel.text'), ...props }}>
        <Icon icon="new-text-box"></Icon>
      </SectionTab>
    );
  }),
  Panel: () => {
    return <TextPanel></TextPanel>;
  },
};
export const DEFAULT_SECTIONS = [TextSection];

const SidePanelContainer = styled.div`
  display: flex;
  height: 100% !important;
  padding: 0px !important;
  position: relative;
`;

const TabsWrap = styled.div`
  @media screen and (min-width: 501px) {
    overflow-y: auto;
    overflow-x: hidden;
    min-width: 72px;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PanelContainer = styled.div`
  padding: 10px 10px 0px 10px !important;
  height: 100% !important;

  &.bp5-navbar {
    width: 350px;
  }

  &.bp5-navbar.collapsed {
    width: 0px;
  }
`;

export const SidePanel = (props) => {
  const tabsRef = useRef(null);
  return (
    <SidePanelContainer className="bp5-navbar tdesign-side-panel">
      <TabsWrap ref={tabsRef} className="tdesign-side-tabs-container">
        <TabsContainer className="tdesign-side-tabs-inner">
          {[1, 2, 3, 4].map((item, index) => {
            return <div key={index}>{index}</div>;
          })}
        </TabsContainer>
      </TabsWrap>
      <PanelContainer className="bp5-navbar tdesign-panel-container">内容</PanelContainer>
    </SidePanelContainer>
  );
};

export default SidePanel;
