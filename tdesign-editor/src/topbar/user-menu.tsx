import React from 'react';
import { Popover, Menu, MenuItem, Button, Position } from '@blueprintjs/core';
import { LogIn, LogOut, User } from '@blueprintjs/icons';

export const UserMenu = () => {
  return (
    <>
      <Popover
        content={
          <Menu style={{ width: '80px !important' }}>
            <MenuItem text="退出登陆" icon={<LogIn />} onClick={() => {}} />
          </Menu>
        }
        position={Position.BOTTOM_RIGHT}
      >
        <Button icon={<User />} minimal></Button>
      </Popover>
    </>
  );
};
