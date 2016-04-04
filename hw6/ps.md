Problem Set 6
=============

Andrew Barba [abarba@ccs.neu.edu](abarba@ccs.neu.edu)

#### 1. Flows

###### a) What is the value of this flow?
Flow is equal to **18**

###### b) What is the minimum s − t cut?
Minimum s-t cut is **21**. Passing through (a,t), (c,t), (b,d) and (s,d)

###### c) Is this a maximum flow? Why, or why not?
This is **NOT** a max flow. The max flow is 21, which we know from finding the minimum cut in part a.

###### d) What are all the minimum s − t cuts in the flow network below on the left?
1. (s,u), (s,v) = 2
2. (s,u), (v,t) = 2
3. (u,t), (v,t) = 2

###### e) What is the minimum capacity of an s − t cut in the flow network below on the right?
(s,u), (v,t) = 4

#### Problem 2
The maximum flow is **13** via the minimum cut (s,a), (s,b), (c,b), (f,t)

#### Problem 3

###### a) The capacity of an edge e increases by 1
1. Create residual graph
2. Add 1 capacity to modified e
3. Search for augmented path (BFS)
4. If path exists, flow can be increased by 1.
5. If path does not exist, flow cannot be increased

###### b) The capacity of an edge e decreases by 1
1. Create residual graph
2. If e was not already at capacity, stop. Flow is unchanged.
3. If at capacity, add 1 to negative capacity on e
4. Look for augmented path from t to s which includes e
5. If found, decrease flow by 1.

#### Problem 4

###### a) State the decision version of the Maximum Clique Problem
Does a graph G = (V, E) include a clique >= size of integer k?

###### b)
3 arguments: The graph G, size integer k, and another graph W. The algorithm will check that:

1. W is a subset of V
2. Size of clique W is >= k
3. Every edge (u,v) in W is in V

###### c)
1. Assume clique(G,k) == true, then W must satisfy conditions in the certifier and the certifier will return true.
2. Assume W, the certifier checks that W is a clique and that |W| >= k, thus clique(G,K) will return true.

###### d)
We can reduce another NP-complete problem down to clique.

#### Problem 5

###### a) Is it the case that Interval Scheduling ≤P Vertex Cover?
Yes. Interval scheduling problem is `O(n*logn)`. It can be solved in polynomial time without making additional calls to a black box service that solves vertex cover. Therefore it is ≤P Vertex Cover.

###### b) Is it the case that Independent Set ≤P Interval Scheduling?
Unknown, because it would resolve the question of whether P = NP. Interval scheduling can be solved in polynomial time so assuming Independent Set ≤P Interval Scheduling then Independent set can be solved in polynomial time and is NP-complete. An arbitrary NP-complete problem can be solved in polynomial time if P = NP. Thus Independent Set ≤P Interval Scheduling implies P = NP.

#### Problem 6
