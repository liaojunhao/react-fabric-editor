import React from 'react';
import { Popover, Button, Position, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import {
  Layers,
  ChevronUp,
  DoubleChevronUp,
  ChevronDown,
  DoubleChevronDown,
  AlignmentLeft,
  AlignmentVerticalCenter,
  AlignmentRight,
  AlignmentTop,
  AlignmentHorizontalCenter,
  AlignmentBottom,
  VerticalDistribution,
  HorizontalDistribution,
} from '@blueprintjs/icons';
import { getName } from '../utils/l10n';
import { observer } from 'mobx-react-lite';
import { StoreType } from '../model/store';

export const PositionPicker = observer(({ store }: { store: StoreType }) => {
  const isSelectElement = store.selectedElements.length > 0;

  return (
    <Popover
      position={Position.BOTTOM}
      content={
        <Menu style={{ width: 280, padding: 13 }}>
          {/* 图层 */}
          <MenuDivider title={getName('toolbar.layering')}></MenuDivider>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <MenuItem shouldDismissPopover={false} icon={<ChevronUp />} text={getName('toolbar.up')}></MenuItem>
              <MenuItem
                shouldDismissPopover={false}
                icon={<DoubleChevronUp />}
                text={getName('toolbar.toForward')}
              ></MenuItem>
            </div>
            <div style={{ width: '50%' }}>
              <MenuItem shouldDismissPopover={false} icon={<ChevronDown />} text={getName('toolbar.down')}></MenuItem>
              <MenuItem
                shouldDismissPopover={false}
                icon={<DoubleChevronDown />}
                text={getName('toolbar.toBottom')}
              ></MenuItem>
            </div>
          </div>
          {/* 位置 */}
          <>
            <MenuDivider title={getName('toolbar.position')}></MenuDivider>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%' }}>
                <MenuItem
                  shouldDismissPopover={false}
                  icon={<AlignmentLeft />}
                  text={getName('toolbar.alignLeft')}
                ></MenuItem>
                <MenuItem
                  shouldDismissPopover={false}
                  icon={<AlignmentVerticalCenter />}
                  text={getName('toolbar.alignCenter')}
                ></MenuItem>
                <MenuItem
                  shouldDismissPopover={false}
                  icon={<AlignmentRight />}
                  text={getName('toolbar.alignRight')}
                ></MenuItem>
              </div>
              <div style={{ width: '50%' }}>
                <MenuItem
                  shouldDismissPopover={false}
                  icon={<AlignmentTop />}
                  text={getName('toolbar.alignTop')}
                ></MenuItem>
                <MenuItem
                  shouldDismissPopover={false}
                  icon={<AlignmentHorizontalCenter />}
                  text={getName('toolbar.alignMiddle')}
                ></MenuItem>
                <MenuItem
                  shouldDismissPopover={false}
                  icon={<AlignmentBottom />}
                  text={getName('toolbar.alignBottom')}
                ></MenuItem>
              </div>
            </div>
          </>
          {/* 对齐 */}
          <>
            <MenuDivider title={getName('toolbar.spaceEvenly')}></MenuDivider>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%' }}>
                <MenuItem
                  shouldDismissPopover={false}
                  icon={<VerticalDistribution />}
                  text={getName('toolbar.verticalDistribution')}
                ></MenuItem>
              </div>
              <div style={{ width: '50%' }}>
                <MenuItem
                  shouldDismissPopover={false}
                  icon={<HorizontalDistribution />}
                  text={getName('toolbar.horizontalDistribution')}
                ></MenuItem>
              </div>
            </div>
          </>
        </Menu>
      }
      disabled={!isSelectElement}
    >
      <Button icon={<Layers />} minimal={true} text={getName('toolbar.position')} disabled={!isSelectElement}></Button>
    </Popover>
  );
});
