import React, { useRef, useState } from 'react';
import { Popover, Button, Position, Menu, MenuItem, MenuDivider, Dialog, Classes } from '@blueprintjs/core';
import { StoreType } from '../model/store';

interface FileMenuProps {
  store: StoreType;
  project: any;
}
export const FileMenu: React.FC<FileMenuProps> = ({ store, project }) => {
  const inputRef = useRef<HTMLInputElement>();

  const [faqOpened, toggleFaq] = useState(false);
  return (
    <>
      <Popover
        position={Position.BOTTOM_RIGHT}
        content={
          <Menu>
            <MenuItem
              icon="plus"
              text="创建新设计"
              onClick={() => {
                project.createNewDesign();
              }}
            />
            <MenuDivider />
            <MenuItem
              icon="folder-open"
              text="解析PSD"
              onClick={() => {
                const file = inputRef.current;
                if (file) {
                  file.click();
                }
              }}
            />
            <MenuItem icon="floppy-disk" text="保存JSON" onClick={() => {}} />
            <MenuDivider />
            <MenuItem text="语言" icon="translate">
              <MenuItem text="English" onClick={() => {}} />
            </MenuItem>
            <MenuItem
              text="关于我们"
              icon="info-sign"
              onClick={() => {
                toggleFaq(true);
              }}
            />
          </Menu>
        }
      >
        <Button minimal text="文件" />
      </Popover>
      <input
        type="file"
        id="load-project"
        accept=".psd"
        ref={inputRef}
        style={{ width: '180px', display: 'none' }}
        onChange={(e) => {
          var input = e.target;
          if (!input.files.length) {
            return;
          }
          const file = input.files[0];
          var reader = new FileReader();
          reader.onloadend = async function () {
            store.insertPSD(file);
          };
          reader.onerror = function () {
            alert('Can not load the project.');
          };
          reader.readAsText(file, 'UTF-8');
        }}
      />
      <Dialog
        icon="info-sign"
        onClose={() => toggleFaq(false)}
        title="关于我们"
        isOpen={faqOpened}
        style={{
          width: '80%',
          maxWidth: '700px',
        }}
      >
        <div className={Classes.DIALOG_BODY}>
          <h2>这是什么的？</h2>
          <p>
            <strong>易图设计工具</strong> 是一款用于创建图形设计的 Web 应用程序。您可以混合使用图像、文本
            和插图来制作社交媒体帖子、YouTube 预览、播客封面、名片和演示文稿。
          </p>
          <h2>它是开源的嘛?</h2>
          <p>部分源代码开源</p>
        </div>
      </Dialog>
    </>
  );
};
