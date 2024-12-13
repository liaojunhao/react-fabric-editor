/**
 * api合集
 */
import { getKey } from './validate-key';

export const URI = 'https://api.polotno.com';
export const API = 'https://api.polotno.com/api';

export const getAPI = () => URI + '/api';

export const URLS = {};

export const getGoogleFontsListAPI = () => `${getAPI()}/get-google-fonts?KEY=${getKey()}`;
