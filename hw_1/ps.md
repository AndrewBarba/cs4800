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
