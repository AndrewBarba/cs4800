Problem Set 2
=============

Andrew Barba [abarba@ccs.neu.edu](abarba@ccs.neu.edu)

#### 1. Adjacency Lists

The below algorithm will compute in `m + n` linear time, where `m` is the number of nodes and `n` is the number of edges in the graph.

```
# Our new adjacency list
let list = {}

# Loop through nodes in graph
for node in G:

  # Init list for this node
  list[node] = []

  # Loop through edges on this node
  for edge in node:

    # Check for any edge that points to this node,
    # If it does, add to our adjacency list for this node
    if edge.pointsToNode():
      list[node].push(edge)
```

#### 2. Degrees

###### i.

True. Let's start by assuming G is **not** connected. If the graph is not connected then the number of vertices `u` and `v` must be such that `u + v = n` and `1 < u < v`. This is clearly smaller than `n^2 / 2`, however, if we know that each vertex has at least `n / 2` edges, then the number of edges must be at least `n^2 / 2`. By contradiction, the graph must be connected.

###### ii.

True. Start with Node 1. Now connect it to an unseen node to prevent a cycle. We must add a new node 2. Now we must connect 2 to an unseen node, we must add a 3rd node. Now connected 3 to an unseen node... etc. etc. This cycle will continue for infinity. If we know G is finite, and for every input to a vertex v there must be an output, then it must contain a cycle.

###### iii.

True. Let's create a graph where every node has >= 2 degrees, and try to make it not contain a cycle. Start with Node 1. Now connect it to an unseen node to prevent a cycle. We must add a new node 2. Now we must connect 2 to an unseen node, we must add a 3rd node. Now connected 3 to an unseen node... etc. etc. This cycle will continue for infinity. If we know G is finite, and for every input to a vertex v there must be an output, then it must contain a cycle. We cannot create a graph without cycles that does not have a vertex with <= 1 degree.

#### 3. Paths

Because the shortest path between `x` and `y` is `> V / 2`, we know that we cannot create another path between `x` and `y` that excludes all vertex in the shortest path. This tells us that every additional path to `x` and `y` must contain at least one node on the original path. Our goal now is to provide 2 more paths between `x` and `y` that do not share a common vertex `z`. If we find 2 such paths, then we would have found a path that did not include a point on the original shortest path between `x` and `y`. By contradiction, we cannot find such a path, and thus there must exist a vertex `z` that is part of all paths joining `x` and `y`.

#### 4. Connectivity

###### i.

Assume we have DFS tree G, which can be uniquely generated for a graph in linear time. By definition of a tree, we can remove a leaf node and the graph will still be connected. Since we can always generate a DFS tree G for a connected graph, then there must exist a node (leaf) that we can remove that keeps G connected.

###### ii.

Build any strongly connected directed graph where each vertex V has only 1 outgoing edge. By removing any one node, the chain will be broken and the graph will no longer be strongly connected. A simple example is a 3 vertex graph where each vertex has an edge pointing into it and one edge pointing out from it.

###### iii.

Similar to the previous question, consider 2 examples from the pervious question, say 2, 3 node triangular strongly connected components where each node in the 3 node set has one edge pointing out of it and one node pointing into it, but, there is no connection between the 2 strongly connected components. By only adding a single edge between the two components, there will be no way to make the two graphs strongly connected because that edge can only lead to the other component and not back to the original.

#### 5. Consistency of constraints

###### i.

No, it cannot be satisfied. Because `1 == 3`, and `2 == 4`, we can substitute variables and say that: `6 > 4 > 1`. And because `5 == 6`, we can substitute variables and say `1 > 6`. It is a contradiction for `1 > 6 && 1 < 4 < 6`.

###### ii.

Because there are two distinct types of constraints, strict equality and strict inequality, we will model a graph where an equality constraint will be represented by a strongly connected pair of vertex, where there is a directed edge from vertex `x` to `y` and also a directed edge from `y` to `x`. The other type of constraint will be represented as a directed edge from the large vertex to the smaller vertex, but no edge from the smaller vertex to the larger vertex. for example, `x > y`, there is a directed edge from `x` to `y` but not from `y` to `x`. We will then use our black box algorithm to find all strongly connected components of our graph. Among completion, we will look for any one directed edge that connects any two strongly connected components but not in the opposite direction. If we find such an edge, we will output: "No", the constraints cannot be met.
