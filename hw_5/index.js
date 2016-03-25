'use strict';

function processData(input) {
  const parts = input.trim().replace(/\D+/g, '|').split('|');
  const e = parts.slice(1);
  const s = e.pop();
  let ans = countNames(e, s);
  console.log(ans);
}

function countNames(dict, str) {
  let aho = new AhoCorasick();

  for (let word of dict) {
    aho.add(word);
  }

  aho.build_fail();

  let paths = {};

  aho.search(str, (word, data, i) => {
    let start = w(i);
    let end = w(i + w(word.length));
    paths[end] = paths[end] || [];
    paths[end].push([start, end]);
  });

  return countPathsTo(paths, 0, str.length);
}

let cache = {};

function countPathsTo(paths, start, end) {
  start = w(start);
  end = w(end);

  let key = `${start}-${end}`;

  if (key in cache) {
    return w(cache[key]);
  }

  let count = 0;
  for (let path of (paths[end] || [])) {
    let add = w(path[0]) === w(start) ? 1 : countPathsTo(paths, start, w(path[0]));
    count = w(count) + w(add);
  }

  cache[key] = w(count);

  return w(count);
}

function w(num) {
  return num % 100000007;
}

/*----------------------------------------------------------------------------*
 * Read Data
 *----------------------------------------------------------------------------*/

 function Trie() {
   this.next = {};
   this.is_word = null;
   this.value = null;
   this.data = [];
 }

 Trie.prototype.add = function(word, data, original_word) {
   var chr, node;
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
     return node.is_word = true;
   }
 };

 Trie.prototype.explore_fail_link = function(word) {
   var chr, i, node, _i, _ref;
   node = this;
   for (i = _i = 0, _ref = word.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
     chr = word.charAt(i);
     node = node.next[chr];
     if (!node) {
       return null;
     }
   }
   return node;
 };

 Trie.prototype.each_node = function(callback) {
   var node, _k, _ref, _ref1;
   _ref = this.next;
   for (_k in _ref) {
     node = _ref[_k];
     callback(this, node);
   }
   _ref1 = this.next;
   for (_k in _ref1) {
     node = _ref1[_k];
     node.each_node(callback);
   }
   return this;
 };

function AhoCorasick() {
  this.trie = new Trie();
}

AhoCorasick.prototype.add = function(word, data) {
  return this.trie.add(word, data);
};

AhoCorasick.prototype.build_fail = function(node) {
  var fail_node, i, sub_node, _i, _k, _ref, _ref1;
  node = node || this.trie;
  node.fail = null;
  if (node.value) {
    for (i = _i = 1, _ref = node.value.length; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
      fail_node = this.trie.explore_fail_link(node.value.substring(i));
      if (fail_node) {
        node.fail = fail_node;
        break;
      }
    }
  }
  _ref1 = node.next;
  for (_k in _ref1) {
    sub_node = _ref1[_k];
    this.build_fail(sub_node);
  }
  return this;
};

AhoCorasick.prototype.foreach_match = function(node, pos, callback) {
  var offset;
  while (node) {
    if (node.is_word) {
      offset = pos - node.value.length;
      callback(node.value, node.data, offset);
    }
    node = node.fail;
  }
  return this;
};

AhoCorasick.prototype.search = function(string, callback) {
  var chr, current, idx, _i, _ref;
  current = this.trie;
  for (idx = _i = 0, _ref = string.length; 0 <= _ref ? _i < _ref : _i > _ref; idx = 0 <= _ref ? ++_i : --_i) {
    chr = string.charAt(idx);
    while (current && !current.next[chr]) {
      current = current.fail;
    }
    if (!current) {
      current = this.trie;
    }
    if (current.next[chr]) {
      current = current.next[chr];
      if (callback) {
        this.foreach_match(current, idx + 1, callback);
      }
    }
  }
  return this;
};

AhoCorasick.prototype.to_dot = function() {
  var dot, fail_cb, last_chr, link_cb, v_;
  dot = ['digraph Trie {'];
  v_ = function(node) {
    if (node && node.value) {
      return "\"" + node.value + "\"";
    } else {
      return "\"\"";
    }
  };
  last_chr = function(str) {
    if (str) {
      return str.charAt(str.length - 1);
    }
  };
  link_cb = function(from, to) {
    var k, option, to_label, to_opt, v;
    to_label = last_chr(to.value);
    to_opt = ["label = \"" + to_label + "\""];
    if (to.is_word) {
      option = {
        style: 'filled',
        color: 'skyblue'
      };
      for (k in option) {
        v = option[k];
        to_opt.push("" + k + " = \"" + v + "\"");
      }
    }
    dot.push("" + (v_(from)) + " -> " + (v_(to)) + ";");
    dot.push("" + (v_(to)) + " [ " + (to_opt.join(',')) + " ];");
    return fail_cb(from, to);
  };
  fail_cb = function(from, to) {
    var style, _ref;
    _ref = [to, to.fail], from = _ref[0], to = _ref[1];
    style = to ? 'dashed' : 'dotted';
    return dot.push("" + (v_(from)) + " -> " + (v_(to)) + " [ style = \"" + style + "\" ];");
  };
  this.trie.each_node(link_cb);
  dot.push('}');
  return dot.join("\n");
};

/*----------------------------------------------------------------------------*
 * Read Data
 *----------------------------------------------------------------------------*/

let input = "";
process.stdin.resume();
process.stdin.setEncoding('ascii');
process.stdin.on('data', data => input += data);
process.stdin.on('end', () => processData(input));
