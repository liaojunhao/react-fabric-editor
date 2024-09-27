import React from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
  width: 100%;
  height: 72px;
  padding-top: 15px;
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  white-space: pre;

  .bp5-dark &:hover,
  .bp5-dark &.active {
    color: #48aff0 !important;
  }

  &:hover,
  &.active {
    background-color: rgba(19, 124, 189, 0.2);
  }
`;
interface SectionTabProps {
  children: any;
  name: string;
  onClick: any;
  active: boolean;
  iconSize?: number;
}
export const SectionTab = ({ children, name, iconSize, onClick, active }: SectionTabProps) => {
  return (
    <TabContainer className={`tdesign-side-panel-tab ${active ? 'active' : ''}`} onClick={onClick}>
      <div style={{ fontSize: (iconSize || 14) + 'px' }}>{children}</div>
      <div style={{ paddingTop: 5 }}>{name}</div>
    </TabContainer>
  );
};
