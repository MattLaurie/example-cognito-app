/*
 * Just need a UUID of some description:
 * - https://gist.github.com/LeverOne/1308368
 * - http://stackoverflow.com/a/26502275
 * - http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 * - http://codepen.io/avesus/pen/wgQmaV?editors=0012
 */
const lut = Array(256).fill(0).map((_, i) => (i < 16 ? '0' : '') + (i).toString(16));

/* tslint:disable:no-bitwise */
const formatUuid = (d0, d1, d2, d3) =>
  lut[d0       & 0xff]        + lut[(d0 >>  8) & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
  lut[d1       & 0xff]        + lut[d1 >>  8 & 0xff] + '-' +
  lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
  lut[d2       & 0x3f | 0x80] + lut[d2 >>  8 & 0xff] + '-' +
  lut[d2 >> 16 & 0xff]        + lut[d2 >> 24 & 0xff] +
  lut[d3       & 0xff]        + lut[d3 >>  8 & 0xff] +
  lut[d3 >> 16 & 0xff]        + lut[d3 >> 24 & 0xff];
/* tslint:enable:no-bitwise */

/**
 * Generates a RFC4122 compliant UUID.
 * @returns {string}
 */
/* tslint:disable:no-bitwise */
export function uuid(): string {
  if (window.crypto && window.crypto.getRandomValues) {
    const d = new Uint32Array(4);
    window.crypto.getRandomValues(d);
    return formatUuid(d[0], d[1], d[2], d[3]);
  } else {
    const d0 = Math.random() * 0x100000000 >>> 0;
    const d1 = Math.random() * 0x100000000 >>> 0;
    const d2 = Math.random() * 0x100000000 >>> 0;
    const d3 = Math.random() * 0x100000000 >>> 0;
    return formatUuid(d0, d1, d2, d3);
  }
}
/* tslint:enable:no-bitwise */
