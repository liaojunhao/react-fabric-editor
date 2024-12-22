import { Popover, Button, Position, Menu, MenuItem } from '@blueprintjs/core';
import React, { useState } from 'react';
import { Import, Media, Document } from '@blueprintjs/icons';
import { getName } from '../utils/l10n';
import { observer } from 'mobx-react-lite';
import { StoreType } from '../model/store';

export const DownloadButton = observer(({ store }: { store: StoreType }) => {
  const [loading, setLoading] = useState(false);
  return (
    <Popover
      position={Position.BOTTOM}
      content={
        <Menu style={{ padding: 8 }}>
          <MenuItem
            icon={<Media />}
            text={getName('toolbar.saveAsImage')}
            onClick={() => {
              console.log('下载图片');
            }}
          ></MenuItem>
          <MenuItem
            icon={<Document />}
            text={getName('toolbar.saveAsPDF')}
            onClick={() => {
              console.log('下载PDF');
            }}
          ></MenuItem>
        </Menu>
      }
    >
      <Button icon={<Import />} text={getName('toolbar.download')} minimal={true} loading={loading}></Button>
    </Popover>
  );
});
