import React, { useState } from 'react';
import { Tooltip, Button } from '@blueprintjs/core';
import { Lock, Unlock } from '@blueprintjs/icons';
import { getName } from '../utils/l10n';
import { StoreType } from '../model/store';
import { observer } from 'mobx-react-lite';

export const LockButton = observer(({ store }: { store: StoreType }) => {
  const isElement = store.selectedShapes.length > 0;
  const element = store.selectedShapes[0];
  // console.log('element ---> ', element, element?.lockMovementX);
  const locked = null == element ? void 0 : element?.lockMovementX;
  // console.log('locked --->', locked);
  const IconLocked = locked ? <Lock /> : <Unlock />;
  const text = locked ? getName('toolbar.lockedDescription') : getName('toolbar.unlockedDescription');

  return (
    <Tooltip content={text} position="bottom" disabled={!isElement}>
      <Button
        icon={IconLocked}
        minimal={true}
        disabled={!isElement}
        onClick={() => {
          if (locked) {
            store.handler.lockHandlers.unLock();
          } else {
            store.handler.lockHandlers.lock();
          }
        }}
      ></Button>
    </Tooltip>
  );
});
