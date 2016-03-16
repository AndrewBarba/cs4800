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

#### 5. Local Minimum
