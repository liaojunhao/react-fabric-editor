import React from 'react';
import { Tooltip, Button } from '@blueprintjs/core';
import { Trash } from '@blueprintjs/icons';
import { getName } from '../utils/l10n';
import { StoreType } from '../model/store';
import { observer } from 'mobx-react-lite';

export const RemoveButton = observer(({ store }: { store: StoreType }) => {
  const isSelectElement = store.selectedElements.length > 0;

  return (
    <Tooltip content={getName('toolbar.removeElements')} position="bottom" disabled={!isSelectElement}>
      <Button
        icon={<Trash />}
        minimal={true}
        onClick={() => {
          console.log('删除功能');
          store.deleteElements();
        }}
        disabled={!isSelectElement}
        style={{ marginLeft: 'auto' }}
      ></Button>
    </Tooltip>
  );
});
