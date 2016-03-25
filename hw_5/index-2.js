'use strict';

function processData(input) {
  const parts = input.trim().replace(/\D+/g, '|').split('|');
  const e = parts.slice(1);
  const s = e.pop();
  let ans = _countNames(new Set(e), s, 0);
  console.log(ans);
}

function countNames(dict, str, count) {

  let size = str.length;

  let wb = [];

  for (let i = 1; i <= size; i++) {
    if (!wb[i] && dict.has(str.substring(0, i))) {
      wb[i] = true;
    }

    if (wb[i] === true) {

      if (i === size) {
        count++;
      }

      for (let j = i + 1; j <= size; j++) {

        if (!wb[j] && dict.has(str.slice(i))) {
          wb[j] = true;
        }

        if (j === size && wb[j] === true) {
          count++;
        }
      }
    }
  }

  return count;
}

let cache = {};

function _countNames(dict, str, count) {
  if (str in cache) {
    return (cache[str] + count) % 100000007;
  }

  let size = str.length;

  for (let i = 1; i < size + 1; i++) {
    let prefix = str.substring(0, i);

    if (dict.has(prefix)) {
      if (i === size) {
        count = count + 1;
        break;
      }

      count = _countNames(dict, str.slice(i), count) % 100000007;
    }
  }

  cache[str] = count % 100000007;

  return count;
}

/*----------------------------------------------------------------------------*
 * Read Data
 *----------------------------------------------------------------------------*/

let input = "";
process.stdin.resume();
process.stdin.setEncoding('ascii');
process.stdin.on('data', data => input += data);
process.stdin.on('end', () => processData(input.trim()));
