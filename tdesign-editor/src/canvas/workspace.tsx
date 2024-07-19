import React from 'react';
import WorkspaceCanvas from './workspace-canvas';
import { WorkspaceProps } from './workspace-canvas';
import PageControls from './page-controls';

export const Workspace = ({ components = {}, ...restProps }: WorkspaceProps) => {
  components.PageControls = components.PageControls ?? PageControls;
  return <WorkspaceCanvas {...restProps} components={components}></WorkspaceCanvas>;
};

export default Workspace;
