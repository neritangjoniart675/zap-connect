/**
 * QuickSort.js - Code for implementing the QuickSort algorithm
 *
 * This code demonstrates a sophisticated and efficient implementation of the QuickSort algorithm
 * It sorts an input array in ascending order using the Divide and Conquer principle
 *
 * Complexity: O(n log n) average case, O(n^2) worst case
 */

// Function to partition the array around a pivot
function partition(arr, low, high) {
  // Choosing the last element as pivot
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// QuickSort implementation
function quickSort(arr, low, high) {
  if (low < high) {
    const pi = partition(arr, low, high);

    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

// Example usage
const array = [64, 25, 12, 22, 11];
const n = array.length;

console.log("Original array: ", array);
quickSort(array, 0, n - 1);
console.log("Sorted array: ", array);

// Output:
// Original array: [64, 25, 12, 22, 11]
// Sorted array: [11, 12, 22, 25, 64]