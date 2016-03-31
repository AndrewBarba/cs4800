'use strict';

function processData(input) {
  const p = input.split('\n').map(l => l.trim().split(' ').map(n => parseInt(n)));
  const k = p[0].slice(1).reverse();
  const l = p[1].slice(1).reverse();
  const n = k.length;
  const m = l.length;
  const d = n + m - 1;
  const c = [];

  for (let t = 0; t < d; t++) {
    let key = 0;
    let start = Math.max(0, t - m + 1);
    let end = Math.min(n - 1, t);
    for (let i = start; i <= end; i++) {
      key += k[i] * l[t - i];
    }
    c.unshift(key);
  }

  while (c[0] === 0 && c.length > 1) {
    c.shift();
  }

  console.log(c.join(' '));
}

/*----------------------------------------------------------------------------*
 * Read Data
 *----------------------------------------------------------------------------*/

let input = "";
process.stdin.resume();
process.stdin.setEncoding('ascii');
process.stdin.on('data', data => input += data);
process.stdin.on('end', () => processData(input.trim()));
