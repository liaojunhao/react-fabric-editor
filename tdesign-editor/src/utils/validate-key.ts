/**
 * 验证密钥
 */
import * as mobx from 'mobx';

const shouldShowCredit = mobx.observable({ value: false });

const showCredit = mobx.action(() => {
  shouldShowCredit.value = true;
});

let API_KEY = '';
export const getKey = () => API_KEY || '';

async function isKeyPaid(e) {
  return true;
}

export async function validateKey(apiKey?: string, showCreditFlag?: boolean) {
  API_KEY = apiKey; // 这里赋予密钥
  const isPaidKey = await isKeyPaid(apiKey);

  if (isPaidKey && !showCreditFlag) {
    return;
  }

  showCredit();
}
