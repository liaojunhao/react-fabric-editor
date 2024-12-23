import React, { useRef } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { getName } from '../utils/l10n';
import { Icon } from '@blueprintjs/core';
import { CloudUpload, Control, Media, LayoutGrid, Fullscreen, Layers } from '@blueprintjs/icons';
import { StoreType } from '../model/store';
import { SectionTab } from './tab-button';

import { TextPanel } from './text-panel';
import { UploadPanel } from './upload-panel';
import { TemplatesPanel } from './templates-panel';
import { PhotosPanel } from './photos-panel';
import { BackgroundPanel } from './background-panel';
import { SizePanel } from './size-panel';
import { LayersPanel } from './layers-panel';

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

export const TemplatesSection: Section = {
  name: 'templates',
  Tab: observer((props) => {
    return (
      <SectionTab {...{ name: getName('sidePanel.templates'), ...props }}>
        <Icon icon={<Control />}></Icon>
      </SectionTab>
    );
  }),
  Panel: ({ store }) => {
    return <TemplatesPanel store={store}></TemplatesPanel>;
  },
};
export const PhotosSection: Section = {
  name: 'photos',
  Tab: observer((props) => {
    return (
      <SectionTab {...{ name: getName('sidePanel.photos'), ...props }}>
        <Icon icon={<Media />}></Icon>
      </SectionTab>
    );
  }),
  Panel: ({ store }) => {
    return <PhotosPanel store={store}></PhotosPanel>;
  },
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
export const UploadSection: Section = {
  name: 'upload',
  Tab: observer((props) => {
    return (
      <SectionTab {...{ name: getName('sidePanel.upload'), ...props }}>
        <Icon icon={<CloudUpload></CloudUpload>}></Icon>
      </SectionTab>
    );
  }),
  Panel: ({ store }) => {
    return <UploadPanel store={store}></UploadPanel>;
  },
};
export const BackgroundSection: Section = {
  name: 'background',
  Tab: observer((props) => {
    return (
      <SectionTab {...{ name: getName('sidePanel.background'), ...props }}>
        <Icon icon={<LayoutGrid />}></Icon>
      </SectionTab>
    );
  }),
  Panel: ({ store }) => {
    return <BackgroundPanel store={store}></BackgroundPanel>;
  },
};
export const SizeSection: Section = {
  name: 'size',
  Tab: observer((props) => {
    return (
      <SectionTab {...{ name: getName('sidePanel.resize'), ...props }}>
        <Icon icon={<Fullscreen />}></Icon>
      </SectionTab>
    );
  }),
  Panel: ({ store }) => {
    return <SizePanel store={store}></SizePanel>;
  },
};

export const LayersSection: Section = {
  name: 'layers',
  Tab: observer((props) => {
    return (
      <SectionTab {...{ name: getName('sidePanel.layers'), ...props }}>
        <Icon icon={<Layers />}></Icon>
      </SectionTab>
    );
  }),
  Panel: ({ store }) => {
    return <LayersPanel store={store}></LayersPanel>;
  },
};

export const DEFAULT_SECTIONS = [
  TemplatesSection,
  PhotosSection,
  BackgroundSection,
  TextSection,
  UploadSection,
  SizeSection,
  LayersSection,
];

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

const HideButtonContainer = styled.div`
  position: absolute;
  right: -14px;
  top: 50%;
  height: 96px;
  width: 15px;
  fill: white;
  cursor: pointer;
  z-index: 10;

  .bp5-dark & {
    right: -13px;
  }

  & .stroke {
    stroke: rgba(0, 0, 0, 0.3);
    fill: none;
  }

  & .fill {
    fill: white;
  }

  .bp5-dark & .fill {
    fill: #2f343c;
  }

  & .pointer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scaleY(2);
    font-size: 0.5rem;
    color: rgba(171, 179, 191, 0.6);
  }

  .bp5-dark & .pointer {
    color: rgba(171, 179, 191, 0.6);
  }

  &:hover .pointer {
    color: black;
  }

  .bp5-dark &:hover .pointer {
    color: white;
  }
`;

const HideButton = () => {};

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
    <SidePanelContainer className={`bp5-navbar tdesign-side-panel ${store.openedSidePanel ? '' : 'collapsed'}`}>
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
