import React from 'react';
import { Tooltip, Button } from '@blueprintjs/core';
import { Duplicate } from '@blueprintjs/icons';
import { getName } from '../utils/l10n';
import { StoreType } from '../model/store';
import { observer } from 'mobx-react-lite';

export const DuplicateButton = observer(({ store }: { store: StoreType }) => {
  const isSelectElement = store.selectedElements.length > 0;
  const l = !isSelectElement;
  return (
    <Tooltip content={getName('toolbar.duplicateElements')} position="bottom" disabled={l}>
      <Button
        icon={<Duplicate />}
        minimal={true}
        style={{ marginLeft: 'auto' }}
        disabled={l}
        onClick={() => {
          console.log('复制功能');
          store.duplicates();
        }}
      ></Button>
    </Tooltip>
  );
});
