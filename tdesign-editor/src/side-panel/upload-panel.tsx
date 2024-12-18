import React, { useRef, useState, useEffect } from 'react';
import { StoreType } from '../model/store';
import { getName } from '../utils/l10n';
import { Button } from '@blueprintjs/core';
import { Upload } from '@blueprintjs/icons';
import { localFileToURL } from '../utils/file';
import { ImagesGrid } from './images-grid';
import { selectImage } from './select-image';

let uploadFunc = async (e) => localFileToURL(e);
export function setUploadFunc(e) {
  uploadFunc = e;
}
function getType(e) {
  const { type: t } = e;
  return t.indexOf('svg') >= 0
    ? 'svg'
    : t.indexOf('image') >= 0
    ? 'image'
    : t.indexOf('video') >= 0
    ? 'video'
    : t.indexOf('audio') >= 0
    ? 'audio'
    : 'image';
}
let filesCache = [];
export const UploadPanel = ({ store }: { store: StoreType }) => {
  const [t, l] = useState(filesCache);
  const [i, r] = useState(false);
  const a = useRef(null);
  useEffect(() => {
    filesCache = t;
  }, [t]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 45, paddingTop: 5 }}>{getName('sidePanel.uploadTip')}</div>
      <div style={{ marginBottom: 20 }}>
        <label htmlFor="input-file">
          <Button
            style={{ width: '100%' }}
            icon={<Upload></Upload>}
            onClick={() => {
              a.current?.click();
            }}
          >
            {getName('sidePanel.uploadImage')}
          </Button>
          <input
            type="file"
            ref={a}
            style={{ display: 'none' }}
            onChange={async (e) => {
              const { target: t } = e;
              r(true);
              try {
                //@ts-ignore
                for (const e of t.files) {
                  const t = await uploadFunc(e);
                  const i = getType(e);
                  let r = t;
                  l((e) => e.concat([{ url: t, type: i, preview: r }]));
                }
              } catch (error) {
                console.error(e);
              }
              r(false);
              t.value = '';
            }}
            multiple={true}
          ></input>
        </label>
      </div>
      <ImagesGrid
        images={t}
        isLoading={i}
        //@ts-ignore
        getPreview={(e) => e.preview}
        onSelect={async (t) => {
          const r = t.url;
          const a = t.type;
          if ('image' === a) {
            selectImage({ src: r, store: store });
          }
        }}
        getExtra={(img) => {
          return (
            <Button
              icon="trash"
              minimal={true}
              onClick={(e) => {
                e.stopPropagation();
                console.log('删除');
              }}
              style={{ color: '#fff' }}
            />
          );
        }}
      ></ImagesGrid>
    </div>
  );
};
