Problem Set 4
=============

Andrew Barba [abarba@ccs.neu.edu](abarba@ccs.neu.edu)

#### 1. The Master Theorem

###### i.

```
a = 16, b = 4, d = 2
2 = log(4, 16)
T(n) = O(n^2 * log(n))
```

###### ii.

```
a = 6, b = 3, d = 1.5
1.5 < log(3, 6)
T(n) = O(n^log(3, 6))
T(n) ~ O(n^1.631)
```

###### iii.

```
a = 2, b = 5, d = 0.5
0.5 > log(5, 2)
T(n) = O(n^0.5)
T(n) = O(sqrt(n))
```

#### 2. A "Hole" in Master Theorem

###### i.

Yes, the masters theorem can be applied because the difference of f(n) and n^(log(b, a)) is polynomial:

```
sqrt(n)log(n) / n^(log(4, 2))
sqrt(n)log(n) / n^0.5
sqrt(n)log(n) / sqrt(n)
log(n)
```

`log(n)` is polynomial.

###### ii.

```
n = 4^k
4n = 4^(k+1)
T(4n) = 2T(4n/4) + sqrt(4n)log(4n)
T(4n) = 2T(n) + sqrt(4n)log(4n)
T(4n) = 2(sqrt(n)*(log(n)^2)) + sqrt(4n)log(4n)
T(4n) = sqrt(4n)*(log(n)^2) + sqrt(4n)log(4n)
T(4n) = sqrt(4n)*(log(n)^2 + log(4n))
T(4n) = sqrt(4n)*(log(4n)^2)
```

###### iii.

```
n = 4^k
4n = 4^(k+1)
T(4n) = 2T(4n/4) + sqrt(4n)log(4n)
T(4n) = 2T(n) + sqrt(4n)log(4n)
T(4n) = 2(0.25*sqrt(n)*(log(n)^2)) + sqrt(4n)log(4n)
T(4n) = 0.25*sqrt(4n)*(log(n)^2) + sqrt(4n)log(4n)
T(4n) = 0.25*sqrt(4n)*(log(n)^2 + log(4n))
T(4n) = 0.25*sqrt(4n)*(log(4n)^2)
```

#### 3. Largest Difference

###### i.

The running time is `O(n^2)`.

###### ii.

0. If list is length 1, return 0.
1. If list is length 2, return list[1] - list[0].
2. Split the given list into two lists of equal size
3. Compute the largest diff on the left list, and compute the largest diff on the right list.
4. Compute a cross diff by subtracting the smallest number in the left list from the largest number in the right list.
5. If the left largest diff is greater than the right largest diff and the cross diff, return left.
6. If the right largest diff is greater than the left largest diff and the cross diff, return right.
7. Otherwise, return cross diff.

It's clear that the time bound holds because we are always splitting the input into two parts and returning when a list is of length 1 or 2. This will always yield log(n) splits of the input and we will visit each element in the list once.

#### 4. Dominant Elements

0. If the length of the list is 1, return the only element in the list.
1. Split the given list into two lists of equal size.
2. Compute dominant element on the left list and the right list.
3. If both elements have the same dominant element, return that element.
4. If there is a left dominant element, count the occurrence in both lists and return it if it is a majority element.
5. If there is a right dominant element, count the occurrence in both lists and return it if it is a majority element.
6. Otherwise, return null.

The running time of this algorithm is `O(n*log(n))`.

#### 5. Local Minimum

We will start by examining the two vertexes connected to the root node and seeing if both vertexes have a higher value than the root. If they do, we are done, but if they don't we will move to the smaller of the two attached nodes and repeat the process. In each iteration we move to the smaller node and worst case, will come to a leaf node where the only vertex above it has to be greater because all values in the tree are unique. This leaf node would then be a local minimum and it took log(n) traversals to get there.
