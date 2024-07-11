import { TdesignEditorContainer, SidePanelWrap, WorkspaceWrap } from 'tdesign-editor';
import { SidePanel } from 'tdesign-editor/lib/side-panel';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <TdesignEditorContainer>
        <SidePanelWrap>
          <SidePanel></SidePanel>
        </SidePanelWrap>
        <WorkspaceWrap></WorkspaceWrap>
      </TdesignEditorContainer>
    </div>
  );
}

export default App;
