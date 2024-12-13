/**
 * api合集
 */
import { getKey } from './validate-key';

export const URI = 'https://api.yitu.com';
export const API = 'https://api.yitu.com/api';

export const getAPI = () => URI + '/api';

export const URLS = {};

export const getGoogleFontsListAPI = () => `${getAPI()}/get-google-fonts?KEY=${getKey()}`;
