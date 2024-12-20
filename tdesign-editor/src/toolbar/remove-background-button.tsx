import { Button } from '@blueprintjs/core';
import React from 'react';
import { getName } from '../utils/l10n';

export const RemoveBackgroundButton = () => {
  return (
    <>
      <Button text={getName('toolbar.removeBackground')} minimal={true}></Button>
    </>
  );
};
