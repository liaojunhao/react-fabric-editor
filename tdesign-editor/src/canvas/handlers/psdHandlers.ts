import psdToJson from '../utils/psd';
import Psd from '@webtoon/psd';
import Handlers from './handlers';

class PsdHandlers {
  constructor(private handlers: Handlers) {}
  insertPSD(file: File, callback?: () => void) {
    return new Promise(async (resolve, reject) => {
      const result = await file.arrayBuffer();
      // 解析PSD文件
      const psdFile = Psd.parse(result as ArrayBuffer);
      console.log(psdFile, '11111');
      const json = await psdToJson(psdFile);
      // 加载json
      this.loadJSON(json, callback);
      resolve('');
    });
  }

  loadJSON(json: string, callback?: () => void) {
    this.handlers.importJSON(json, callback);
  }
}

export default PsdHandlers;
