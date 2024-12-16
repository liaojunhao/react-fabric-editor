import React from 'react';
import { Button } from '@blueprintjs/core';
import { Import } from '@blueprintjs/icons';
import { getName } from '../utils/l10n';
import { StoreType } from '../model/store';

export const DownloadButton = ({ store }: { store: StoreType }) => {
  return (
    <Button
      icon={<Import />}
      text={getName('toolbar.download')}
      intent="primary"
      // loading={saving}
      onClick={() => {
        // setQuality(1);
      }}
      style={{ width: 155 }}
    />
  );
};
