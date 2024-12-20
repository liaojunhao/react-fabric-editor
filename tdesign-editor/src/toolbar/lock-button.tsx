import React from 'react';
import { Tooltip, Button } from '@blueprintjs/core';
import { Lock } from '@blueprintjs/icons';
import { getName } from '../utils/l10n';
import { StoreType } from '../model/store';
import { observer } from 'mobx-react-lite';

export const LockButton = observer(({ store }: { store: StoreType }) => {
  return (
    <Tooltip content={getName('toolbar.lockedDescription')} position="bottom">
      <Button icon={<Lock />} minimal={true} style={{ marginLeft: 'auto' }}></Button>
    </Tooltip>
  );
});
