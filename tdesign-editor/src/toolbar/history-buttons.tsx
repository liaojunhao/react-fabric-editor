import React from 'react';
import { Navbar, Alignment, Button, NavbarDivider } from '@blueprintjs/core';
import { StoreType } from '../model/store';

export const HistoryButtons = ({ store }: { store: StoreType }) => {
  return (
    <Navbar.Group align={Alignment.LEFT} style={{ paddingRight: '10px' }}>
      <Button icon="undo" minimal={true}></Button>
      <Button icon="redo" minimal={true}></Button>
      <NavbarDivider></NavbarDivider>
    </Navbar.Group>
  );
};
