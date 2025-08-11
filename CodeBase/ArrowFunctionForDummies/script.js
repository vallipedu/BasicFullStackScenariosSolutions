// Get a reference to the number input field
const numberInput = document.getElementById('numberInput');

// Get references to the display spans for square and cube results
const squareResultSpan = document.getElementById('squareResult');
const cubeResultSpan = document.getElementById('cubeResult');

/**
 * Calculates the square and cube of the input number and updates the display.
 * This is an arrow function, ideal for concise event handlers.
 */
const updateCalculations = () => {
    // Get the current value from the input field
    // Using parseFloat to ensure we're working with a number, not a string
    const inputValue = parseFloat(numberInput.value);

    // Check if the input is a valid number
    if (isNaN(inputValue)) {
        // If not a number, set displays to 0 or a placeholder
        squareResultSpan.textContent = '0';
        cubeResultSpan.textContent = '0';
        console.log("Input is not a valid number.");
        return; // Exit the function
    }

    // Calculate the square using basic multiplication
    const square = inputValue * inputValue;

    // Calculate the cube using basic multiplication
    const cube = inputValue * inputValue * inputValue;

    // Update the text content of the display spans
    squareResultSpan.textContent = square;
    cubeResultSpan.textContent = cube;

    console.log(`Input: ${inputValue}, Square: ${square}, Cube: ${cube}`); // For debugging
};

// Add an event listener to the input field
// The 'input' event fires whenever the value of the <input> element changes.
// We use the 'updateCalculations' arrow function directly as the callback.
numberInput.addEventListener('input', updateCalculations);

// Initial call to set the display values when the page first loads.
// This ensures the counter starts correctly, especially if there's a default value.
window.onload = updateCalculations;
