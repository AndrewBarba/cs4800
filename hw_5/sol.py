import sys
import fileinput
from sets import Set

sys.setrecursionlimit(99999999)

dict = Set([])
str = ""
i = 0

for line in fileinput.input():
    i = i + 1
    line = line.strip()
    if i == 1:
        dict = Set(line.split(" ")[1:])
    if i == 2:
        str = line

cache = {}

print len(str)

def count_names(str, dict, count):
    if str in cache:
        return cache[str] + count

    size = len(str)

    for i in range(1, size + 1):
        prefix = str[0:i]

        if prefix in dict:
            if i == size:
                count = count + 1
                break

            count = count_names(str[i:], dict, count)

    cache[str] = count

    return count

ans = count_names(str, dict, 0)
print ans
print ans % 100000007
