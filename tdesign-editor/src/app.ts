import styled from 'styled-components';
import './normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
// include blueprint-icons.css for icon font support
// import '@blueprintjs/icons/lib/css/blueprint-icons.css';

export const TdesignEditorContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  max-height: 100vh;
`;

export const SidePanelWrap = styled.div`
  height: 100%;
  width: auto;
  max-height: 100vh;
`;

export const WorkspaceWrap = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex: 1;
  flex-direction: column;
  position: relative;
`;
