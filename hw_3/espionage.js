'use strict';

function espionage(nodes, edges, check) {
  let mst = kruskal(nodes, edges);
  let answers = check.map(wire => isActive(mst, wire) ? 'yes' : 'no');
  console.log(answers.join('\n'));
}

function isActive(mst, wire) {
  for (let i = 0; i < mst.length; i++) {
    let node = mst[i];
    if ((node[0] === wire[0] && node[1] === wire[1]) || (node[0] === wire[1] && node[1] === wire[0])) return true;
  }
  return false;
}

/*----------------------------------------------------------------------------*
 * Kruskal's Algorthim
 *----------------------------------------------------------------------------*/

function kruskal(vertices, edges) {
  let mst = [];
  let forest = new UnionFind(vertices.length);
  edges = edges.sort((a, b) => a[2] - b[2]);
  edges.forEach(edge => {
    let u = edge[0];
    let v = edge[1];
    if (forest.find(u) !== forest.find(v)) {
      mst.push(edge);
      forest.union(u, v);
    }
  });
  return mst;
}

/*----------------------------------------------------------------------------*
 * Disjointed Set
 *----------------------------------------------------------------------------*/

class UnionFind {

  constructor(count) {
    this._roots = new Array(count);
    this._ranks = new Array(count);
    for(let i = 0; i < count; i++) {
      this._roots[i] = i;
      this._ranks[i] = 0;
    }
  }

  get roots() { return this._roots; }
  get ranks() { return this._ranks; }
  get length() { return this._roots.length; }

  find(x) {
    let x0 = x;
    let roots = this.roots;
    while (roots[x] !== x) {
      x = roots[x];
    }
    while (roots[x0] !== x) {
      let y = roots[x0];
      roots[x0] = x;
      x0 = y;
    }
    return x;
  }

  union(x, y) {
    let xr = this.find(x);
    let yr = this.find(y);
    if (xr === yr) return;
    let ranks = this.ranks;
    let roots = this.roots;
    let xd = ranks[xr];
    let yd = ranks[yr];
    if (xd < yd) {
      roots[xr] = yr;
    } else if (yd < xd) {
      roots[yr] = xr;
    } else {
      roots[yr] = xr;
      ranks[xr]++;
    }
  }
}

/*----------------------------------------------------------------------------*
 * Parse Data
 *----------------------------------------------------------------------------*/

function processData(input) {
  const parts = input.split('\n').map(line => line.split(' ').map(num => parseInt(num)));
  const totalStations = parts[0][0];
  const totalWires = parts[0][1];

  const edges = parts.slice(1, totalWires + 1);
  const check = parts.slice(totalWires + 1);
  const nodes = new Array(totalStations);
  for (let i = 0; i < totalStations; i++) nodes[i] = i;

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
