/*
    File: script.js
    Author: HariBabu Mutchakala
    Version: 1.0
    Date: August 5, 2025
    Objective:
    This file contains all the JavaScript logic for the Dell E-commerce Inventory
    Management system. It manages the product catalog using a JavaScript array,
    handles user interactions like checking availability, and dynamically updates
    the web page to display the inventory status.
*/

// A global array to store the list of Dell products. This serves as our backend data.
var dellProducts = ["NBKRIST Dell Series 1234578","Dell XPS 13", "Dell Inspiron 15", "Dell Alienware m15 R7"];

/**
 * Updates the inventory list displayed on the web page.
 * It clears the current list and repopulates it with the contents of the dellProducts array.
 */
function updateInventoryDisplay() {
    var inventoryList = document.getElementById("inventory-list");
    // Clear the existing list content to prevent duplicates
    inventoryList.innerHTML = "";
    
    // Loop through the dellProducts array and create a new list item for each product
    var i;
    for (i = 0; i < dellProducts.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = dellProducts[i];
        inventoryList.appendChild(listItem);
    }
}

/**
 * Checks the availability of a product based on the user's input.
 * It handles empty input and displays a message below the button.
 */
function checkAvailability() {
    // Get the input field and status message elements
    var productNameInput = document.getElementById("product-name");
    var productName = productNameInput.value.trim();
    var statusMessage = document.getElementById("status-message");

    // Check if the input is empty. If so, display an error message.
    if (productName === "") {
        statusMessage.textContent = "Please enter a product name to check. ❗";
        statusMessage.className = "out-of-stock"; // Reusing this class for a red background
        return; // Exit the function to prevent further execution
    }

    var found = false;
    var i;
    // Loop through the product array to find a match
    for (i = 0; i < dellProducts.length; i++) {
        // Use toLowerCase() for a case-insensitive comparison
        if (dellProducts[i].toLowerCase() === productName.toLowerCase()) {
            found = true;
            break; // Exit the loop once a match is found for efficiency
        }
    }

    // Clear any previous status message class and content to reset the display
    statusMessage.className = "";
    statusMessage.textContent = "";

    // Display the appropriate message based on the search result
    if (found) {
        statusMessage.textContent = productName + " is currently in stock. ✅";
        statusMessage.className = "in-stock"; // Apply green background style
    } else {
        statusMessage.textContent = productName + " is out of stock. ❌";
        statusMessage.className = "out-of-stock"; // Apply red background style
    }
    
    // Clear the input field after the check
    productNameInput.value = "";
}

// Add a click event listener to the "Check Availability" button
// When the button is clicked, the checkAvailability function will be executed.
document.getElementById("check-btn").addEventListener("click", checkAvailability);

// Call the updateInventoryDisplay function when the page first loads
// This ensures the initial inventory is shown to the user immediately.
window.onload = updateInventoryDisplay;