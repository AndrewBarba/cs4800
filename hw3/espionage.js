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
    this._store = [];
    for(let i = 0; i < count; i++) {
      let node = {
        parent: null,
        rank: 0,
        id: i
      };
      node.parent = node;
      this._store.push(node);
    }
  }

  get store() {
    return this._store;
  }

  find(id) {
    let n = this.store[id];
    return (n.parent === n) ? n : this.find(n.parent.id);
  }

  union(id1, id2) {
    let n1 = this.find(id1);
    let n2 = this.find(id2);
    if (n1.rank < n2.rank) {
      n1.parent = n2;
      return n2;
    } else if (n2.rank < n1.rank) {
      n2.parent = n1;
      return n1;
    } else {
      n2.parent = n1;
      n1.rank += 1;
      return n1;
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
