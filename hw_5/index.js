'use strict';

function processData(input) {
  const parts = input.trim().replace(/\D+/g, '|').split('|');
  const e = parts.slice(1);
  const s = e.pop();
  const c = countNames(e, s);
  console.log(c);
}

function countNames(dict, str) {
  let trie = new Trie();

  for (let word of dict) {
    trie.add(word);
  }

  return _countNames(str, trie);
}

function _countNames(str, node) {
  let len = str.length;
  let end = len - 1;
  let root = [];

  for (let i = 0; i < len + 1; i++) {
    root.push([]);
  }

  for (let start = 0; start <= end; start++) {
    if (start === 0 || root[start].length > 0) {
      annotate(str, start, end, root, node);
    }
  }

  let count = 0;
  for (let i = 0; i <= str.length; i++) {
    count = _countPaths(root, i);
  }
  return count;
}

function annotate(str, start, end, root, node) {
  let i = start;
  while (i <= end) {
    if (node.child(str[i])) {
      node = node.child(str[i]);
      if (node.isWord) {
        root[i+1].push(start);
      }
      i += 1;
    } else {
      break;
    }
  }
}

let cache = {};

function _countPaths(root, index) {
  if (index in cache) {
    return cache[index];
  }

  let count = 0;

  for (let i of root[index]) {
    count += i === 0 ? 1 : _countPaths(root, i);
  }

  cache[index] = mod(count);

  return cache[index];
}

function mod(num) {
  return num % 100000007;
}

/*----------------------------------------------------------------------------*
 * Trie
 *----------------------------------------------------------------------------*/

class Trie {

  constructor() {
    this.next = {};
    this.isWord = null;
    this.value = null;
    this.data = [];
  }

  add(word, data, original_word) {
    let chr, node;
    chr = word.charAt(0);
    node = this.next[chr];
    if (!node) {
      node = this.next[chr] = new Trie();
      if (original_word) {
        node.value = original_word.substr(0, original_word.length - word.length + 1);
      } else {
        node.value = chr;
      }
    }
    if (word.length > 1) {
      return node.add(word.substring(1), data, original_word || word);
    } else {
      node.data.push(data);
      node.isWord = true;
    }
    return this;
  }

  follow(word) {
    let chr, i, node, _i, _ref;
    node = this;
    for (i = _i = 0, _ref = word.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      chr = word.charAt(i);
      node = node.next[chr];
      if (!node) {
        return null;
      }
    }
    return node;
  }

  child(label) {
    return this.next ? this.next[label] : undefined;
  }

  each(callback) {
    let node, _k, _ref, _ref1;
    _ref = this.next;
    for (_k in _ref) {
      node = _ref[_k];
      callback(this, node);
    }
    _ref1 = this.next;
    for (_k in _ref1) {
      node = _ref1[_k];
      node.each(callback);
    }
    return this;
  }
}

/*----------------------------------------------------------------------------*
 * Read Data
 *----------------------------------------------------------------------------*/

let input = "";
process.stdin.resume();
process.stdin.setEncoding('ascii');
process.stdin.on('data', data => input += data);
process.stdin.on('end', () => processData(input));
