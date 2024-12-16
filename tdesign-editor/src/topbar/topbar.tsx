import styled from 'styled-components';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useProject } from '../project';
import { Navbar, Alignment, EditableText, Popover, Button } from '@blueprintjs/core';
import { FileMenu } from './file-menu';
import { StoreType } from '../model/store';
import { DownloadButton } from './download-button';

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
    <Popover content={<div style={{ padding: '10px', maxWidth: '300px' }}>需要开通会员</div>} interactionKind="hover">
      <div style={{ padding: '0 5px' }}>
        <Button minimal={true} icon="cloud" style={{ opacity: 0.8 }}>
          存储
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
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <DownloadButton store={store} />
        </Navbar.Group>
      </NavInner>
    </NavbarContainer>
  );
};

export default observer(Topbar);
