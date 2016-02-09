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

#### 3.

Because the shortest path between `x` and `y` is `> V / 2`, we know that we cannot create another path between `x` and `y` that excludes all vertex in the shortest path. This tells us that every additional path to `x` and `y` must contain at least one node on the original path. Our goal now is to provide 2 more paths between `x` and `y` that do not share a common vertex `z`. If we find 2 such paths, then we would have found a path that did not include a point on the original shortest path between `x` and `y`. By contradiction, we cannot find such a path, and thus there must exist a vertex `z` that is part of all paths joining `x` and `y`.
