import React from 'react';
import styled from 'styled-components';

const SidePanelContainer = styled.div`
  display: flex;
  height: 100% !important;
  padding: 0px !important;
  position: relative;
`;
export const SidePanel = (props) => {
  return <SidePanelContainer>侧边栏</SidePanelContainer>;
};

export default SidePanel;
