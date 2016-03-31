'use strict';

function processData(input) {
  const p = input.split('\n').map(line => line.split(' ').map(num => parseInt(num)));
  const n = p[0][0]; // node count
  const m = p[0][1]; // edge count
  const s = p[0][2]; // start
  const t = p[0][3]; // end
  const paths = p.slice(1);
  const graph = [];

  for (let i = 0; i < n; i++) {
    let p = [];
    for (let j = 0; j < n; j++) {
      p.push(0);
    }
    graph.push(p);
  }

  for (let path of paths) {
    graph[path[0]][path[1]] = 1;
  }

  console.log(fordFulkerson(graph, s, t));
}

function bfs(rGraph, s, t, parent) {
	let visited = [];
	let queue = [];
	let V = rGraph.length;

	for (let i = 0; i < V; i++) {
		visited[i] = false;
	}

	queue.push(s);
	visited[s] = true;
	parent[s] = -1;

	while (queue.length !== 0) {
		let u = queue.shift();
		for (let v = 0; v < V; v++) {
			if (visited[v] === false && rGraph[u][v] > 0) {
				queue.push(v);
				parent[v] = u;
				visited[v] = true;
			}
		}
	}

	return visited[t] === true;
}

function fordFulkerson(graph, s, t) {
	let rGraph = [];
	for (let u = 0; u < graph.length; u++) {
		let temp = [];
		for (let v = 0; v < graph.length; v++) {
			temp.push(graph[u][v]);
		}
		rGraph.push(temp);
	}

	let parent = [];
	let maxFlow = 0;

	while (bfs(rGraph, s, t, parent)) {
		let pathFlow = Number.MAX_VALUE;
    for (let v = t; v !== s; v = parent[v]) {
			let u = parent[v];
			pathFlow = Math.min(pathFlow, rGraph[u][v]);
		}
    for (let v = t; v !== s; v = parent[v]) {
			let u = parent[v];
			rGraph[u][v] -= pathFlow;
			rGraph[v][u] += pathFlow;
		}
		maxFlow += pathFlow;
	}

	return maxFlow;
}

/*----------------------------------------------------------------------------*
 * Read Data
 *----------------------------------------------------------------------------*/

let input = "";
process.stdin.resume();
process.stdin.setEncoding('ascii');
process.stdin.on('data', data => input += data);
process.stdin.on('end', () => processData(input.trim()));
