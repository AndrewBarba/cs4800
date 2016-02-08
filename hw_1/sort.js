// HackerRank
// andrewbarb
'use strict';

let input = "";

process.stdin.resume();
process.stdin.setEncoding('ascii');
process.stdin.on('data', data => input += data);
process.stdin.on('end', () => processData());

let sillySortCompares = 0;
let bubbleSortCompares = 0;
let mergeSortCompares = 0;

function processData() {

  const array = input.split('\n')[1].split(' ').map(val => Number(val));

  sillySort(array.slice());
  bubbleSort(array.slice());
  mergeSort(array.slice());

  console.log(sillySortCompares);
  console.log(bubbleSortCompares);
  console.log(mergeSortCompares);
}

function sillySort(array) {
  if (array.length > 9) {
    sillySortCompares = -1;
    return array;
  }

  if (array.length < 2) {
    return array;
  }

  for (let i = 0; i <= array.length - 1; i++) {
    let tmp = array[0];
    array[0] = array[i];
    array[i] = tmp;
    let maybe = [array[0]].concat(sillySort(array.slice(1)));
    let broke = false;
    for (let j = 0; j <= maybe.length - 2; j++) {
      sillySortCompares++;
      if (maybe[j] > maybe[j+1]) {
        broke = true;
        break;
      }
    }
    if (!broke) {
      return maybe;
    } else {
      let tmp = array[0];
      array[0] = array[i];
      array[i] = tmp;
    }
  }
}

function bubbleSort(array) {
  if (array.length > 100000) {
    bubbleSortCompares = -1;
    return array;
  }

  while (true) {
    let swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      bubbleSortCompares++;
      if (array[i] > array[i + 1]) {
        let tmp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = tmp;
        swapped = true;
      }
    }
    if (!swapped) {
      return array;
    }
  }
}

function mergeSort(array) {
  if (array.length < 2) return array;

  let left = array.slice(0, parseInt(array.length / 2));
  let right = array.slice(parseInt(array.length / 2));

  left = mergeSort(left);
  right = mergeSort(right);

  let i = 0, j = 0, k = 0;

  while(i < left.length && j < right.length) {
    mergeSortCompares++;
    if (left[i] < right[j]) {
      array[k] = left[i];
      k++;
      i++;
    } else {
      array[k] = right[j];
      k++;
      j++;
    }
  }

  return array.slice(0, k).concat(left.slice(i)).concat(right.slice(j));
}
