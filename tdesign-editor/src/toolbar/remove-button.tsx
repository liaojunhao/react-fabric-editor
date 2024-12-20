import React from 'react';
import { Tooltip, Button } from '@blueprintjs/core';
import { Trash } from '@blueprintjs/icons';
import { getName } from '../utils/l10n';
import { StoreType } from '../model/store';
import { observer } from 'mobx-react-lite';

export const RemoveButton = observer(({ store }: { store: StoreType }) => {
  return (
    <Tooltip content={getName('toolbar.removeElements')} position="bottom">
      <Button icon={<Trash />} minimal={true} style={{ marginLeft: 'auto' }}></Button>
    </Tooltip>
  );
});
