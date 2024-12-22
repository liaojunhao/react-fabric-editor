/**
 * 需要注册才可用的下载组件
 */
import React, { useState } from 'react';
import { Button, Popover, Position, Menu, HTMLSelect, Slider } from '@blueprintjs/core';
import { Import } from '@blueprintjs/icons';
import { getName } from '../utils/l10n';
import { StoreType } from '../model/store';

export const DownloadButton = ({ store }: { store: StoreType }) => {
  const [saving, setSaving] = useState(false);
  const [quality, setQuality] = useState(1);
  const [type, setType] = useState('png');
  const [progress, setProgress] = useState(0);

  const maxQuality = type === 'mp4' ? 1 : 300 / 72;

  return (
    <Popover
      position={Position.BOTTOM}
      content={
        <Menu style={{ width: 285, padding: 10 }}>
          <li className="bp5-menu-header">
            <h6 className="bp5-heading">格式</h6>
          </li>
          <HTMLSelect
            fill
            onChange={(e) => {
              setType(e.target.value);
              setQuality(1);
            }}
            value={type}
          >
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="pdf">PDF</option>
            <option value="json">JSON</option>
          </HTMLSelect>
          <>
            <li className="bp5-menu-header">
              <h6 className="bp5-heading">质量</h6>
            </li>
            <div style={{ padding: '10px' }}>
              <Slider
                value={quality}
                labelRenderer={false}
                onChange={(quality) => {
                  setQuality(quality);
                }}
                stepSize={0.2}
                min={0.2}
                max={maxQuality}
                showTrackFill={false}
              />
              {type !== 'pdf' && (
                <div>
                  {Math.round(store.width * quality)} x {Math.round(store.height * quality)} px
                </div>
              )}
            </div>
          </>

          <Button
            fill
            intent="primary"
            loading={saving}
            onClick={async () => {
              setSaving(true);
              await new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve(1);
                }, 5000);
              });
              setSaving(false);
            }}
          >
            下载 {type.toUpperCase()}
          </Button>
        </Menu>
      }
    >
      <Button
        icon={<Import />}
        text={getName('toolbar.download')}
        intent="primary"
        onClick={() => {
          // setQuality(1);
        }}
        style={{ width: 155 }}
      />
    </Popover>
  );
};
