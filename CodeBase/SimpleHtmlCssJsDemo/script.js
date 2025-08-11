/*
 ******************************************************************
 *                                                                *
 *  JavaScript File         *
 *                                                                *
 *     Author: Hari Shankar                                        *
 *     Version: 1.0                                                *
 *     Created: 4 AUG 2025                                        *
 *     Last Updated: 11 AUG 2025                                   *
 *     Description: This script contains functions for a simple web*
 *                                                                *
 *     application. It includes functions to add two numbers, add  *
 *                                                                *
 *     three numbers, and check if a number is prime. The script   *
 *                                                                *
 *     handles user input validation and updates the DOM           *
 *                                                                *
 *     dynamically with the results.                               *
 *                                                                *
 ******************************************************************
 */

// Function to add two numbers
function addTwoNumbers() {
    var num1Input = document.getElementById('num1AddTwo');
    var num2Input = document.getElementById('num2AddTwo');
    var resultDisplay = document.getElementById('resultAddTwo');

    var num1 = parseFloat(num1Input.value);
    var num2 = parseFloat(num2Input.value);

    // Check for valid numbers
    if (isNaN(num1) || isNaN(num2)) {
        resultDisplay.textContent = 'Please enter valid numbers.';
        resultDisplay.style.color = 'red';
        return;
    }

    var sum = num1 + num2;
    resultDisplay.textContent = 'Sum: ' + sum;
    resultDisplay.style.color = '#4CAF50'; // Green for success
}

// Function to add three numbers
function addThreeNumbers() {
    var num1Input = document.getElementById('num1AddThree');
    var num2Input = document.getElementById('num2AddThree');
    var num3Input = document.getElementById('num3AddThree');
    var resultDisplay = document.getElementById('resultAddThree');

    var num1 = parseFloat(num1Input.value);
    var num2 = parseFloat(num2Input.value);
    var num3 = parseFloat(num3Input.value);

    // Check for valid numbers
    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
        resultDisplay.textContent = 'Please enter valid numbers.';
        resultDisplay.style.color = 'red';
        return;
    }

    var sum = num1 + num2 + num3;
    resultDisplay.textContent = 'Sum: ' + sum;
    resultDisplay.style.color = '#4CAF50'; // Green for success
}

// Function to check if a number is prime
function checkPrimeNumber() {
    var primeInput = document.getElementById('primeInput');
    var resultDisplay = document.getElementById('resultPrime');

    var num = parseInt(primeInput.value);

    // Check for valid integer input
    if (isNaN(num) || num <= 1) {
        resultDisplay.textContent = 'Please enter a whole number greater than 1.';
        resultDisplay.style.color = 'red';
        return;
    }

    var isPrime = true;
    for (var i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            isPrime = false;
            break;
        }
    }

    if (isPrime) {
        resultDisplay.textContent = num + ' is a prime number! ✅';
        resultDisplay.style.color = '#4CAF50'; // Green for success
    } else {
        resultDisplay.textContent = num + ' is not a prime number. ❌';
        resultDisplay.style.color = '#008CBA'; // Blue for not prime
    }
}