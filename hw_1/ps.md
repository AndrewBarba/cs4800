Problem Set 1
=============

Andrew Barba [abarba@ccs.neu.edu](abarba@ccs.neu.edu)

#### 1. The Gale-Shapely Algorithm

###### i. How many matchings (not necessarily stable) between men and women are there?

```
3! = 6
```

###### ii. Consider the matching {(A, X), (B, Y ), (C, Z)}. Is this matching stable? Why or why not?

This matching is not stable. Man B would prefer to be with Woman X more than his current partner, AND Woman X would prefer to be with Man B more than her current partner.

###### iii. How many stable matchings are there? List them.

```
1. {(A, Z), (B, Y), (C, X)}
2. {(A, Z), (B, X), (C, Y)}
```

###### iv. What is the matching returned by Gale-Shapley algorithm?

```
{(A, Z), (B, X), (C, Y)}
```

###### v. What is the matching returned by the version of Gale-Shapley algorithm in which women play the role of men (i.e., women propose).

```
{(A, Z), (B, Y), (C, X)}
```

#### 2. Single Stable Matching

###### i. True or False? Suppose that in an instance I of the Stable Matching Problem there is a man m and a woman w who like each other the most. Then the pair (m, w) must belong to every stable matching in this instance. Explain your answer.

True. If there were a stable match where `m` was paired with `w'` and `w` was paired with `m'`, then there would exist a match where both `m` and `w` prefer to be with each other over their current partner. This means that the matching was never stable to begin with.

###### ii. Explain why there is only one stable matching in the below instance of the Stable Matching Problem. List all of that matching’s edges.

The pairs `(A, Z)` and `D, Y` must exist in all stable matches due to the contradiction above. This means there are only two additional matches: `{(B, X), (C, T)}` and `{(B, T), (C, X)}`. `{(B, X), (C, T)}` is unstable because both `B` and `T` would prefer to be with each other over their current match, therefore there is only one possible match left and thus this instance only has one possible stable matching.

#### 3. Stable Matching Examples

#### 4. Linear Algorithm

###### i. What is the running time of the “brute force” algorithm to determine whether ai + aj = S for some 1 ≤ i < j ≤ n?

```
O(n!)
```

###### ii. Give an algorithm for the above problem which runs in O(n) time.

1. Create pointer `a` at index `0`
2. Create pointer `z` at index `length - 1`
3. `sum` is equal to `array[a] + array[z]`
4. If `sum == value`, done.
5. If `sum < value`, `a++`
6. If `sum > value`, `z--`
7. Repeat until `a == z` or match found
