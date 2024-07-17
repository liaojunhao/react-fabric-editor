import { TdesignEditorContainer, SidePanelWrap, WorkspaceWrap } from 'tdesign-editor';
import { SidePanel } from 'tdesign-editor/lib/side-panel';
import { Workspace } from 'tdesign-editor/lib/canvas/workspace';
import { createStore } from 'tdesign-editor/lib/model/store';

const store = createStore();
store.addPage();
store.addPage();
store.addPage();

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <TdesignEditorContainer>
        <SidePanelWrap>
          <SidePanel></SidePanel>
        </SidePanelWrap>
        <WorkspaceWrap>
          <Workspace store={store}></Workspace>
        </WorkspaceWrap>
      </TdesignEditorContainer>
    </div>
  );
}

export default App;
