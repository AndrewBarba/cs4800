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

#### 4. Dominant Elements

#### 5. Local Minimum
