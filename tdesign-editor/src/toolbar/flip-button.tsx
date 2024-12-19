import React from 'react';
import { Popover, Button, Position, Menu, MenuItem } from '@blueprintjs/core';
import { ArrowsHorizontal, ArrowsVertical } from '@blueprintjs/icons';
import { getName } from '../utils/l10n';

export const FlipButton = () => {
  return (
    <Popover
      position={Position.BOTTOM}
      content={
        <Menu>
          <MenuItem
            shouldDismissPopover={false}
            icon={<ArrowsHorizontal />}
            text={getName('toolbar.flipHorizontally')}
          ></MenuItem>
          <MenuItem
            shouldDismissPopover={false}
            icon={<ArrowsVertical />}
            text={getName('toolbar.flipVertically')}
          ></MenuItem>
        </Menu>
      }
    >
      <Button minimal={true} text={getName('toolbar.flip')}></Button>
    </Popover>
  );
};

export default FlipButton;
