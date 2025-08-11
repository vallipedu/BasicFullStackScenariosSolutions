/*
 ******************************************************************
 *   JavaScript File         *
 *                                                                *
 *     Author: Hari Shankar                                        *
 *     Version: 1.0                                                *
 *     Created: 4 AUG 2025                                        *
 *     Last Updated: 11 AUG 2025                                   *
 *     Description: This script provides functionalities for       *
 *                                                                *
 *     number operations. It includes a utility function to parse  *
 *                                                                *
 *     comma-separated input into a number array, calculates the   *
 *                                                                *
 *     sum of array elements, determines odd and even sums, and    *
 *                                                                *
 *     generates a Fibonacci series. All operations include        *
 *                                                                *
 *     input validation and dynamic updates to the HTML display.   *
 *                                                                *
 ******************************************************************
 */


// Function to parse a comma-separated string into an array of numbers using a for loop
function parseNumberArray(inputString) {
    const numbers = [];
    const stringParts = inputString.split(',');
    for (let i = 0; i < stringParts.length; i++) {
        const trimmedString = stringParts[i].trim();
        const number = parseFloat(trimmedString);
        // Only add the number if it is a valid number
        if (!isNaN(number)) {
            numbers.push(number);
        }
    }
    return numbers;
}

// 1. Calculates and displays the sum of an array
function calculateAndDisplaySum() {
    const arraySumInput = document.getElementById('arraySumInput');
    const arraySumResult = document.getElementById('arraySumResult');

    const inputString = arraySumInput.value;
    const numbers = parseNumberArray(inputString);
    let sum = 0;

    if (numbers.length > 0) {
        for (let i = 0; i < numbers.length; i++) {
            sum = sum + numbers[i];
        }
        arraySumResult.textContent = 'Sum: ' + sum;
        arraySumResult.style.color = '#006699';
    } else {
        arraySumResult.textContent = 'Please enter valid numbers.';
        arraySumResult.style.color = 'red';
    }
}

// 2. Calculates and displays the sum of odd and even numbers
function calculateAndDisplayOddEven() {
    const oddEvenInput = document.getElementById('oddEvenInput');
    const oddEvenResult = document.getElementById('oddEvenResult');

    const inputString = oddEvenInput.value;
    const numbers = parseNumberArray(inputString);
    let oddSum = 0;
    let evenSum = 0;

    if (numbers.length > 0) {
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] % 2 === 0) {
                evenSum = evenSum + numbers[i];
            } else {
                oddSum = oddSum + numbers[i];
            }
        }
        oddEvenResult.textContent = 'Odd Sum: ' + oddSum + ', Even Sum: ' + evenSum;
        oddEvenResult.style.color = '#006699';
    } else {
        oddEvenResult.textContent = 'Please enter valid numbers.';
        oddEvenResult.style.color = 'red';
    }
}

// 3. Calculates and displays the Fibonacci series
function calculateAndDisplayFibonacci() {
    const fibonacciLimitInput = document.getElementById('fibonacciLimit');
    const fibonacciResult = document.getElementById('fibonacciResult');

    const limit = parseInt(fibonacciLimitInput.value);
    
    if (!isNaN(limit) && limit >= 0) {
        const series = [];
        if (limit > 0) {
            series.push(0);
        }
        if (limit > 1) {
            series.push(1);
        }
        for (let i = 2; i < limit; i++) {
            series.push(series[i - 1] + series[i - 2]);
        }
        fibonacciResult.textContent = 'Series: [' + series.join(', ') + ']';
        fibonacciResult.style.color = '#006699';
    } else {
        fibonacciResult.textContent = 'Please enter a valid non-negative number.';
        fibonacciResult.style.color = 'red';
    }
}