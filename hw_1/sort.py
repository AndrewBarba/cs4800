import sys

length = 0
array = []

"""
Read in length of array and numbers
"""
for place, line in enumerate(sys.stdin):
    if place == 0:
        length = int(line)
    if place == 1:
        array = [int(x) for x in line.split(" ")]

silly_sort_compares = -1
bubble_sort_compares = -1
merge_sort_compares = 0

def silly_sort(arr):
    if length > 9:
        return arr

    nonlocal silly_sort_compares
    silly_sort_compares = 0

    if len(arr) < 2:
        return arr
    else:
        for i in range(0, len(arr) - 1):
            arr[0], arr[i] = arr[i], arr[0]
            maybe_sorted = [arr[0]] + silly_sort(arr[1:])
            for j in range(0, len(maybe_sorted) - 2):
                silly_sort_compares = silly_sort_compares + 1
                if maybe_sorted[j] > maybe_sorted[j + 1]:
                    break
            return maybe_sorted

def bubble_sort(arr):
    if length >  10000:
        return arr

    bubble_sort_compares = 0

    return arr

def merge_sort(arr):
    return arr

silly_sort(array)
bubble_sort(array)
merge_sort(array)

print(silly_sort_compares)
print(bubble_sort_compares)
print(merge_sort_compares)
