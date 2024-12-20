import React from 'react';
import { Tooltip, Button } from '@blueprintjs/core';
import { Duplicate } from '@blueprintjs/icons';
import { getName } from '../utils/l10n';
import { StoreType } from '../model/store';
import { observer } from 'mobx-react-lite';

export const DuplicateButton = observer(({ store }: { store: StoreType }) => {
  return (
    <Tooltip content={getName('toolbar.duplicateElements')} position="bottom">
      <Button icon={<Duplicate />} minimal={true} style={{ marginLeft: 'auto' }}></Button>
    </Tooltip>
  );
});
