import * as mobx from 'mobx';
let GOOGLE_FONTS = mobx.observable(['Roboto', 'Amatic SC', 'Press Start 2P', 'Marck Script', 'Rubik Mono One']),
  googleFontsChanged = mobx.observable({ value: false });

export function isGoogleFontChanged() {
  return googleFontsChanged.value;
}
export function getFontsList() {
  return GOOGLE_FONTS;
}

export function addGlobalFont(t) {
  globalFonts.push(t);
}
export function removeGlobalFont(t) {
  const e = globalFonts.findIndex((e) => e.fontFamily === t);
  -1 !== e && globalFonts.splice(e, 1);
}
export function replaceGlobalFonts(t) {
  globalFonts.replace(t);
}

export const globalFonts = mobx.observable([]);
