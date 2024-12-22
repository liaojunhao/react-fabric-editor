import styled from 'styled-components';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useProject } from '../project';
import { Navbar, Alignment, EditableText, Popover, Button, AnchorButton, NavbarDivider } from '@blueprintjs/core';
import { FileMenu } from './file-menu';
import { StoreType } from '../model/store';
import { DownloadButton } from './download-button';
import { Code } from '@blueprintjs/icons';
import { Github, Weibo } from '@icon-park/react';
import { UserMenu } from './user-menu';

const NavbarContainer = styled('div')`
  white-space: nowrap;
  z-index: 11;
  @media screen and (max-width: 500px) {
    overflow-x: auto;
    overflow-y: hidden;
    max-width: 100vw;
  }
`;

const NavInner = styled('div')`
  @media screen and (max-width: 500px) {
    display: flex;
  }
`;

const Status = observer(({ project }: { project: any }) => {
  // const Icon = !project.cloudEnabled ? MdcCloudAlert : project.status === 'saved' ? MdcCloudCheck : MdcCloudSync;
  return (
    <Popover
      content={<div style={{ padding: '10px', maxWidth: '300px' }}>需要开通会员</div>}
      interactionKind="hover"
      position="bottom"
    >
      <div style={{ padding: '0 5px' }}>
        <Button minimal={true} icon="cloud" style={{ opacity: 0.8 }}>
          云存储
        </Button>
      </div>
    </Popover>
  );
});

interface TopbarProps {
  store: StoreType;
}
const Topbar: React.FC<TopbarProps> = ({ store }) => {
  const project = useProject();
  return (
    <NavbarContainer className="bp5-navbar">
      <NavInner>
        <Navbar.Group align={Alignment.LEFT}>
          <FileMenu store={store} project={project} />
          <div
            style={{
              paddingLeft: '20px',
              maxWidth: '200px',
            }}
          >
            <EditableText placeholder="设计名称" onChange={(name) => {}} />
          </div>
          <Status project={project} />
          <AnchorButton
            href="#"
            target="_blank"
            minimal
            icon={<Code className="bp5-icon" style={{ fontSize: '20px' }} />}
            style={{ marginRight: 5 }}
          >
            API文档
          </AnchorButton>
          <AnchorButton
            minimal
            href="#"
            target="_blank"
            icon={<Github theme="outline" size="20" className="bp5-icon" />}
            style={{ marginRight: 5 }}
          ></AnchorButton>
          <AnchorButton
            minimal
            href="#"
            target="_blank"
            icon={<Weibo theme="outline" className="bp5-icon" size="20" />}
            style={{ marginRight: 5 }}
          ></AnchorButton>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <DownloadButton store={store} />
          <NavbarDivider />
          <UserMenu></UserMenu>
        </Navbar.Group>
      </NavInner>
    </NavbarContainer>
  );
};

export default observer(Topbar);
