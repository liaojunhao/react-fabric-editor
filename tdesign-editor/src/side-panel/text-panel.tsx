import React, { useState } from 'react';
import { StoreType } from '../model/store';
import { Tabs, Tab, Button } from '@blueprintjs/core';
import { getName } from '../utils/l10n';
import styled from 'styled-components';

const Container = styled.div`
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;

  .bp5-dark & .polotno-text-preview-plain {
    filter: invert(1);
  }
`;

const FontContainer = styled.div`
  height: 100px;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(16, 22, 26, 0.3);
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.4);
  position: relative;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  text-align: center;
  color: white;
  margin-bottom: 10px;
`;

export const TextPanel = ({ store }: { store: StoreType }) => {
  const [value, setValue] = useState('text');

  const addText = () => {
    const newElement = {
      type: 'textbox',
      fontFamily: 'Roboto',
      fontSize: 55,
      text: 'hello world！',
      width: 555,
    };
    store.addElement(newElement, { skipSelect: false, centered: true });
  };
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Tabs
        large={true}
        onChange={(e: string) => {
          setValue(e);
        }}
      >
        <Tab id="text">测试</Tab>
        {/* <Tab id="text">{getName('sidePanel.text')}</Tab>
        <Tab id="font">{getName('sidePanel.myFonts')}</Tab> */}
      </Tabs>
      {value === 'text' && (
        <Container style={{ margin: '10px 0' }}>
          <Button onClick={addText}>添加文字</Button>
          <Button
            onClick={() => {
              store.setWorkspaseBg('red');
            }}
          >
            修改工作区的颜色
          </Button>
          <Button
            onClick={() => {
              store.setSize(300, 100);
            }}
          >
            修改画布大小
          </Button>
        </Container>
      )}
      {value === 'font' && <Container>font</Container>}
    </div>
  );
};
