import React from 'react';
import { Navbar, Alignment, Button } from '@blueprintjs/core';
import { StoreType } from '../model/store';

export const HistoryButtons = ({ store }: { store: StoreType }) => {
  return (
    <Navbar.Group align={Alignment.LEFT} style={{ paddingRight: '10px' }}>
      <Button icon="undo" minimal={true}></Button>
      <Button icon="redo" minimal={true}></Button>
    </Navbar.Group>
  );
};
