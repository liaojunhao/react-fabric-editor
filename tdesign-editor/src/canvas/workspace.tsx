import React from 'react';
import WorkspaceCanvas from './workspace-canvas';
import { WorkspaceProps } from './workspace-canvas';

export const Workspace = ({ components, ...restProps }: WorkspaceProps) => {
  return <WorkspaceCanvas {...restProps} components={components}></WorkspaceCanvas>;
};

export default Workspace;
