// Get a reference to the text area element
const myTextArea = document.getElementById('myTextArea');

// Get a reference to the span element where the count will be displayed
const charCountSpan = document.getElementById('charCount');

/**
 * Updates the character count displayed on the page.
 * This function is an arrow function, making the syntax concise for event handling.
 */
const updateCharacterCount = () => {
    // Get the current text from the text area
    const currentText = myTextArea.value;

    // Calculate the length of the text
    const numberOfCharacters = currentText.length;

    // Update the content of the span element with the new count
    charCountSpan.textContent = numberOfCharacters;

    console.log("Character count updated:", numberOfCharacters); // For debugging
};

// Add an event listener to the text area
// The 'input' event fires whenever the value of the <textarea> element changes.
// We use the arrow function 'updateCharacterCount' directly as the callback.
myTextArea.addEventListener('input', updateCharacterCount);

// Initial call to set the count when the page first loads (e.g., if there's default text)
// This ensures the counter starts correctly without user interaction.
window.onload = updateCharacterCount;
