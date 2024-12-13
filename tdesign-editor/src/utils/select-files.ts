/**
 * @description: 选择文件
 * @param {Object} options accept = '', capture = '', multiple = false
 * @return {Promise}
 */
export function selectFiles(options: {
  accept?: string;
  capture?: string;
  multiple?: boolean;
}): Promise<FileList | null> {
  return new Promise((resolve) => {
    // const { onChange, open } = useFileDialog(options);
    // onChange((files) => {
    //   resolve(files);
    // });
    // open();
  });
}
