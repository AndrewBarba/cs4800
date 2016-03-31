Problem Set 3
=============

Andrew Barba [abarba@ccs.neu.edu](abarba@ccs.neu.edu)

#### 1. Dijsktra Algorithm Run

###### Part A.

```
A    | B    | C    | D    | E    | F    | G    | H
---- | ---- | ---- | ---- | ---- | ---- | ---- | ----
A    | 1(A) | X    | X    | 4(A) | 8(A) | X    | X
B    | 1(A) | 3(B) | X    | 4(A) | 7(B) | 7(B) | X
C    | 1(A) | 3(B) | 4(C) | 4(A) | 7(B) | 5(C) | X
D    | 1(A) | 3(B) | 4(C) | 4(A) | 7(B) | 5(D) | 8(D)
E    | 1(A) | 3(B) | 4(C) | 4(A) | 7(B) | 5(D) | 8(D)
G    | 1(A) | 3(B) | 4(C) | 4(A) | 6(G) | 5(D) | 6(G)
F    | 1(A) | 3(B) | 4(C) | 4(A) | 6(G) | 5(D) | 6(G)
```

###### Part B.

```
A
| \
B  E
|
C
|
D
|
G
| \
F  H
```

#### 2. Negative Edges

Dijsktra's Algorithm **can fail** on a graph where the only negative weighted edges are those coming from the source node. A simple example where we create a cycle:

```
 <---(50)-----
|             |
S --(-200)--> A
|
----(-50)---> B
```

In this example the algorithm will determine the "shortest" path to B is directly from S. However, if you follow S -> A -> S -> B we can technically get to B in shorter distance based on the weights and could keep repeating this path creating a negative cycle.

#### 3. Skiing agency

1. Create a graph with `n + 2` nodes
2. Label half the nodes sequentially with a prefix of `A`. For example: `A1, A2, A3` etc.
3. Label the other half sequentially with a prefix of `B`. For example: `B1, B2, B3` etc.
4. A prefixed nodes represent skiers, B prefix nodes represent skis. For every ski, `B`, node draw add an edge to every skier, `A`, node with weight `0`. It will cost us nothing to go from a ski to the next person in line.
5. For every skier, `A`, node draw add an edge to every ski, `B`, node with weight `abs(ski.height - skier.height)`. It will cost us the absolute difference in height to go from a skier to a ski. This represents assigning a ski to that skier.
6. Run Dijsktra's Algorithm on this graph.
7. The shortest path produced will be the best we can match skiers to skis.

This algorithm works for three main reasons:

1. There are no paths from a skier to another skier, or a ski to another ski. Every path either assigns a ski to a skier or moves to the next skier in line.
2. Dijsktra's Algorithm must visit every node in the graph to find the shortest path that connects all nodes.
3. All weights are positive which means the algorithm is guaranteed to find a shortest path.

We know the algorithm is correct because by design (reason 1 above) every path that connects all nodes produces some pairing where all skiers are assigned a pair of skis. Knowing that, Dijsktra's Algorithm is going to guarantee it finds the shortest of those paths.

#### 4. Trees

###### Part A.

By definition the subset of edges that are connected and all have positive weight cannot contain a cycle because a cycle would allow us to remove an edge without affecting the connectivity. If we could remove an edge then the subset would not be a minimum in the first place and that is a contradiction.

###### Part B.

Borrowing from my example in question 2:

```
 <---(50)-----
|             |
S --(-200)--> A
|
----(-50)---> B
```

This graph contains a negative-cycle which by definition cannot be a tree.

#### 5. Maximum Edge Minimal

First we would split the the edges into 2 sets, one set with all weights less than the median weight and one set with all weights greater than or equal to the median weight. If a spanning tree exists in one of the subset with weights less than the median then we recurse over just that set. Otherwise we recurse over the larger set composed of super vertices and we repeat this process until there are two super vertices remaining with a single edge between them.
