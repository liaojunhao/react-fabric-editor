import React from 'react';
import { Alignment, Navbar, Button, NavbarDivider } from '@blueprintjs/core';
import { getName } from '../utils/l10n';
import MdAddCircleOutline from '@meronex/icons/ios/MdAddCircleOutline';

export const CommonToolbar = () => {
  return (
    <>
      <Navbar.Group align={Alignment.LEFT} style={{ paddingRight: '10px', marginLeft: -10 }}>
        <Button
          icon={<MdAddCircleOutline className="bp5-icon" style={{ fontSize: 20 }} />}
          text={getName('toolbar.addImg')}
          minimal={true}
        ></Button>
        <Button
          icon={<MdAddCircleOutline className="bp5-icon" style={{ fontSize: 20 }} />}
          text={getName('toolbar.addText')}
          minimal={true}
          rightIcon="caret-down"
        ></Button>
      </Navbar.Group>
    </>
  );
};
