import { Button } from '@blueprintjs/core';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { StoreType } from '../model/store';
import { getName } from '../utils/l10n';

export const GroupButton = observer(({ store }: { store: StoreType }) => {
  const isOne = store.selectedElements.length > 1;
  const isGroup = 1 === store.selectedElements.length && 'group' === store.selectedElements[0].type;

  return (
    <>
      {isOne && (
        <Button minimal={true} style={{ marginLeft: 'auto' }}>
          {getName('toolbar.groupElements')}
        </Button>
      )}
      {isGroup && (
        <Button minimal={true} style={{ marginLeft: 'auto' }}>
          {getName('toolbar.ungroupElements')}
        </Button>
      )}
    </>
  );
});
