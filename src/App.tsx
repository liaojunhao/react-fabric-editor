// import { useState } from "react";
// import reactLogo from "@assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import { Header } from "./components/Header";
// import './utils/index.ts'
// import ImageMapEditor from './editor';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import {
  TextSection,
  PhotosSection,
  ElementsSection,
  UploadSection,
  BackgroundSection,
  SizeSection
} from 'polotno/side-panel';

import { createStore } from 'polotno/model/store';

const store = createStore({
  key: 'YfyjzbKDIRtvhiaehanr', // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: false
});
// console.log('store ===> ', store);
const page = store.addPage();
page.addElement({
  x: 150,
  y: 150,
  type: 'text',
  fill: 'black',
  text: 'hello'
});

const sections = [TextSection];

function App() {
  return (
    <PolotnoContainer style={{ width: '100vw', height: '100vh' }}>
      <SidePanelWrap>
        <SidePanel store={store} sections={sections} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
}

export default App;
