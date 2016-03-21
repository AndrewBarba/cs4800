'use strict';

function processData(input) {
  const parts = input.split('\n');
  const e = parts[0].split(' ').slice(1);
  const s = parts[1];
  console.log(countNames(e, s));
}

function countNames(parts, string) {
  let startPaths = {};
  let endPaths = {};

  for (let part of parts) {
    for (let path of findPaths(part, string)) {
      startPaths[path[0]] = startPaths[path[0]] || [];
      startPaths[path[0]].push(path);
      endPaths[path[1]] = endPaths[path[1]] || [];
      endPaths[path[1]].push(path);
    }
  }

  return countPathsTo(startPaths, endPaths, 0, string.length);
}

function countPathsTo(startPaths, endPaths, start, end) {
  let count = 0;
  for (let path of (endPaths[end] || [])) {
    count += path[0] === start ? 1 : countPathsTo(startPaths, endPaths, start, path[0]);
  }
  return count;
}

function findPaths(prefix, string) {
  let ans = [];
  for (let i = 0; i < string.length; i++) {
    if (prefix === string.slice(i, i + prefix.length)) {
      ans.push([i, i + prefix.length]);
    }
  }
  return ans;
}

/*----------------------------------------------------------------------------*
 * Read Data
 *----------------------------------------------------------------------------*/

let input = "";
process.stdin.resume();
process.stdin.setEncoding('ascii');
process.stdin.on('data', data => input += data);
process.stdin.on('end', () => processData(input.trim()));
