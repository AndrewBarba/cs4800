Problem Set 3
=============

Andrew Barba [abarba@ccs.neu.edu](abarba@ccs.neu.edu)

#### 1. Dijsktra Algorithm Run

###### Part a.

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

###### Part b.

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

#### 4. Trees

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
