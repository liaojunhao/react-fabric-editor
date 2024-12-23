import React from 'react';
import styled from 'styled-components';
import { Navbar, Alignment, Button, Popover, Menu, MenuItem } from '@blueprintjs/core';
import { ZoomOut, ZoomIn } from '@blueprintjs/icons';
import { observer } from 'mobx-react-lite';
import { StoreType } from '../model/store';
import { getName } from '../utils/l10n';

const OuterContainer = styled.div`
  position: relative;
  height: 0px;
`;
const Container = styled.div`
  position: absolute;
  bottom: 5px;
  width: auto;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 4px lightgrey;
`;

const SCALE_VARIATIONS = [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 3];
const MAX_SCALE = SCALE_VARIATIONS[SCALE_VARIATIONS.length - 1];
const MIN_SCALE = SCALE_VARIATIONS[0];

type Props = {
  store: StoreType;
  align?: Alignment;
};

export const ZoomGroup = observer(({ store }: Props) => {
  const max = Math.max(MAX_SCALE, store.scaleToFit);
  const min = Math.min(MIN_SCALE, store.scaleToFit);
  const isMax = store.scale < max;
  const isMin = store.scale > min;

  return (
    <Navbar.Group style={{ height: 35 }}>
      <Button
        icon={<ZoomOut />}
        minimal={true}
        disabled={!isMin}
        onClick={() => {
          store.setScale(store.scale / 1.2);
        }}
      ></Button>
      <Popover
        content={
          <Menu style={{ minWidth: 80 }}>
            {SCALE_VARIATIONS.map((item) => {
              return (
                <MenuItem
                  style={{ textAlign: 'center' }}
                  key={item}
                  text={Math.round(100 * item) + '%'}
                  onClick={() => {
                    store.setScale(item);
                  }}
                />
              );
            })}
            <MenuItem
              style={{ textAlign: 'center' }}
              text={getName('scale.realSize')}
              onClick={() => {
                store.setScale(store.scaleToFit);
              }}
            ></MenuItem>
            <MenuItem
              style={{ textAlign: 'center' }}
              text={getName('scale.reset')}
              onClick={() => {
                store.handler.workareaHandlers.auto();
              }}
            ></MenuItem>
          </Menu>
        }
      >
        <Button minimal={true}>{Math.round(100 * store.scale) + '%'}</Button>
      </Popover>
      <Button
        icon={<ZoomIn />}
        minimal={true}
        disabled={!isMax}
        onClick={() => {
          store.setScale(1.2 * store.scale);
        }}
      ></Button>
    </Navbar.Group>
  );
});

export const ZoomButtons = observer(({ store }: Props) => {
  return (
    <OuterContainer>
      <Container>
        <Navbar style={{ height: 35, padding: '0 5px' }}>
          <ZoomGroup store={store}></ZoomGroup>
        </Navbar>
      </Container>
    </OuterContainer>
  );
});

export default ZoomButtons;
