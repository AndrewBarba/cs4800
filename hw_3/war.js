'use strict';

function espionage(nodes, edges, check) {
  let mst = kruskal(nodes, edges);
  check.forEach(wire => {
    let found = mst.filter(node => {
      return (node[0] === wire[0] && node[1] === wire[1]) || (node[0] === wire[1] && node[1] === wire[0]);
    });
    console.log(found.length ? 'yes' : 'no');
  });
}

function kruskal(vertices, edges) {
  let mst = [];
  let forest = new MakeSet(vertices.length);
  edges = edges.sort((a, b) => a[2] - b[2]);
  edges.forEach(edge => {
    let u = edge[0];
    let v = edge[1];
    if (forest.find(u) !== forest.find(v)) {
      mst.push(edge);
      forest.link(u, v);
    }
  });
  return mst;
}

class MakeSet {

  constructor(count) {
    this._roots = new Array(count);
    this._ranks = new Array(count);
    for(let i = 0; i < count; ++i) {
      this._roots[i] = i;
      this._ranks[i] = 0;
    }
  }

  get roots() { return this._roots; }
  get ranks() { return this._ranks; }
  get length() { return this._roots.length; }

  makeSet() {
    let n = this.roots.length;
    this.roots.push(n);
    this.ranks.push(0);
    return n;
  }

  find(x) {
    let x0 = x;
    let roots = this.roots;
    while(roots[x] !== x) {
      x = roots[x];
    }
    while(roots[x0] !== x) {
      let y = roots[x0];
      roots[x0] = x;
      x0 = y;
    }
    return x;
  }

  link(x, y) {
    let xr = this.find(x);
    let yr = this.find(y);
    if(xr === yr) {
      return;
    }
    let ranks = this.ranks;
    let roots = this.roots;
    let xd = ranks[xr];
    let yd = ranks[yr];
    if(xd < yd) {
      roots[xr] = yr;
    } else if(yd < xd) {
      roots[yr] = xr;
    } else {
      roots[yr] = xr;
      ++ranks[xr];
    }
  }
}

function processData(input) {
  const parts = input.split('\n').map(line => line.split(' ').map(num => parseInt(num)));
  const totalStations = parts[0][0];
  const totalWires = parts[0][1];

  const edges = parts.slice(1, totalWires + 1);
  const check = parts.slice(totalWires + 1);
  const nodes = [];
  for (let i = 0; i < totalStations; i++) {
    nodes.push(i);
  }

  espionage(nodes, edges, check);
}

/*----------------------------------------------------------------------------*
 * Read Data
 *----------------------------------------------------------------------------*/

let input = "";
process.stdin.resume();
process.stdin.setEncoding('ascii');
process.stdin.on('data', data => input += data);
process.stdin.on('end', () => processData(input.trim()));