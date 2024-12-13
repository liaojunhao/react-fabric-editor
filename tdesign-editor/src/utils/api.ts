/**
 * api合集
 */
import { getKey } from './validate-key';

export const URI = 'https://api.polotno.com';
export const API = 'https://api.polotno.com/api';

export const getAPI = () => URI + '/api';

export const URLS = {};

export const getGoogleFontsListAPI = () => `${getAPI()}/get-google-fonts?KEY=${getKey()}`;

export const getGoogleFontImage = (e) => {
  return `${URI}/google-fonts-previews/black/${((t = e), (o = ' '), (s = '-'), t.replace(new RegExp(o, 'g'), s))}.png`;
  var t, o, s;
};
