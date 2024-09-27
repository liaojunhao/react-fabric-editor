import React, { useRef } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { getName } from '../utils/l10n';
import { Icon } from '@blueprintjs/core';
import { StoreType } from '../model/store';
import { SectionTab } from './tab-button';

import TextPanel from './text-panel';

interface SectionTabProps {
  onClick: any;
  active: boolean;
}
export type Section = {
  name: string;
  Tab: React.ComponentType<SectionTabProps>;
  Panel: React.ComponentType<{
    store: StoreType;
  }>;
};

export const TextSection: Section = {
  name: 'text',
  Tab: observer((props) => {
    return (
      <SectionTab {...{ name: getName('sidePanel.text'), ...props }}>
        <Icon icon="new-text-box"></Icon>
      </SectionTab>
    );
  }),
  Panel: ({ store }) => {
    return <TextPanel store={store}></TextPanel>;
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

const useOnFirstRender = (callback) => {
  const isFirst = useRef(true);
  if (isFirst.current) {
    isFirst.current = false;
    callback();
  }
};

interface SidePanelProps {
  store: StoreType;
  sections?: Section[];
  defaultSection?: string;
}
export const SidePanel = observer(({ sections, store }: SidePanelProps) => {
  useOnFirstRender(() => {
    store.openSidePanel('text');
  });
  const tabsWrapRef = useRef(null);

  const renderSections = sections || DEFAULT_SECTIONS;
  const currentSection = renderSections.find((item) => {
    return item.name === store.openedSidePanel;
  });
  const RenderPanel = currentSection?.Panel;

  return (
    <SidePanelContainer className="bp5-navbar tdesign-side-panel">
      <TabsWrap ref={tabsWrapRef} className="tdesign-side-tabs-container">
        <TabsContainer className="tdesign-side-tabs-inner">
          {renderSections.map(({ name, Tab }) => {
            return (
              <Tab
                key={name}
                onClick={() => {
                  name === store.openedSidePanel ? store.openSidePanel('') : store.openSidePanel(name);
                }}
                active={name === store.openedSidePanel}
              ></Tab>
            );
          })}
        </TabsContainer>
      </TabsWrap>
      {RenderPanel && (
        <PanelContainer className="bp5-navbar tdesign-panel-container">
          <RenderPanel store={store}></RenderPanel>
        </PanelContainer>
      )}
    </SidePanelContainer>
  );
});

export default SidePanel;
