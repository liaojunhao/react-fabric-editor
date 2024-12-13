import styled from 'styled-components';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useProject } from '../project';
import { Navbar, Alignment, EditableText } from '@blueprintjs/core';
import { FileMenu } from './file-menu';
import { StoreType } from '../model/store';

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
        </Navbar.Group>
      </NavInner>
    </NavbarContainer>
  );
};

export default observer(Topbar);
