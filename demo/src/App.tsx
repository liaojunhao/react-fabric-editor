// import React from 'react';
import { TdesignEditorContainer, SidePanelWrap, WorkspaceWrap } from 'tdesign-editor';
import { SidePanel } from 'tdesign-editor/lib/side-panel';
import { Workspace } from 'tdesign-editor/lib/canvas/workspace';
import { createStore } from 'tdesign-editor/lib/model/store';
import { Toolbar } from 'tdesign-editor/lib/toolbar/toolbar';
import Topbar from 'tdesign-editor/lib/topbar/topbar';
import { createProject, ProjectContext } from 'tdesign-editor/lib/project';

import 'tdesign-editor/lib/design-editor.css';

// const getOffsetHeight = () => {
//   return window.innerHeight;
// };

// const useHeight = () => {
//   const [height, setHeight] = React.useState(getOffsetHeight());
//   React.useEffect(() => {
//     window.addEventListener('resize', () => {
//       setHeight(getOffsetHeight());
//     });
//   }, []);
//   return height;
// };

function App() {
  const store = createStore({ key: 'YfyjzbKDIRtvhiaehanr' });
  const project = createProject({ store });
  // const height = useHeight();

  return (
    <ProjectContext.Provider value={project}>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Topbar store={store}></Topbar>
        <div style={{ width: '100vw', height: 'calc(100vh - 50px)', overflow: 'hidden' }}>
          <TdesignEditorContainer>
            <SidePanelWrap>
              <SidePanel store={store} />
            </SidePanelWrap>
            <WorkspaceWrap>
              <Toolbar store={store} downloadButtonEnabled={true} />
              <Workspace store={store} />
            </WorkspaceWrap>
          </TdesignEditorContainer>
        </div>
      </div>
    </ProjectContext.Provider>
  );
}

export default App;
