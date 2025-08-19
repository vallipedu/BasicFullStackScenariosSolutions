/*
    File: script.js
    Author: HariBabu Mutchakala
    Version: 1.0
    Date: August 19, 2025
    Objective:
    This file contains all the JavaScript logic for the Dell E-commerce Inventory
    Management system. It handles fetching and parsing product data from an external
    JSON file, dynamically displaying the inventory in a table, and implementing a
    product availability check with temporary status messages. It utilizes modern
    JavaScript features like arrow functions, object destructuring, and array methods.
*/

// Global variable to store the product data once fetched from JSON
let products = [];

// --- DOM Element References ---
// Using arrow functions for concise variable assignments
const productSearchInput = document.getElementById('product-search-input');
const checkAvailabilityBtn = document.getElementById('check-availability-btn');
const inventoryTableBody = document.querySelector('#inventory-table tbody');
const statusMessageDiv = document.getElementById('status-message');

// --- Functions ---

/**
 * Displays a temporary message to the user.
 * The message will fade out after a specified duration.
 * @param {string} message - The text content of the message.
 * @param {string} type - The type of message ('in-stock', 'out-of-stock').
 * @param {number} duration - How long the message should be visible in milliseconds.
 */
const displayTemporaryMessage = (message, type, duration = 3000) => {
    statusMessageDiv.textContent = message;
    statusMessageDiv.className = type; // Apply the appropriate CSS class for styling
    statusMessageDiv.style.opacity = 1; // Make the message visible

    // Use setTimeout to clear the message after the specified duration
    setTimeout(() => {
        statusMessageDiv.style.opacity = 0; // Start fading out
        // Wait for transition to complete before removing class and text
        setTimeout(() => {
            statusMessageDiv.textContent = '';
            statusMessageDiv.className = '';
        }, 500); // Assuming CSS transition is 0.5s
    }, duration);
};

/**
 * Fetches product data from the external products.json file.
 * Uses async/await for cleaner asynchronous code.
 */
const fetchProducts = async () => {
    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        products = await response.json(); // Assign fetched data to the global products array
        displayInventory(); // Display the inventory once data is loaded
    } catch (error) {
        console.error('Error fetching products:', error);
        displayTemporaryMessage('Failed to load inventory data. Please try again later. ⚠️', 'out-of-stock', 5000);
    }
};

/**
 * Dynamically displays the product inventory in a table.
 * Uses forEach and object destructuring to populate the table rows.
 */
const displayInventory = () => {
    // Clear existing table rows
    inventoryTableBody.innerHTML = '';

    // Iterate over the products array to create table rows
    // Using forEach and object destructuring for readability
    products.forEach(product => {
        // Object destructuring to easily extract properties from each product object
        const { id, name, inStock, price, category } = product;

        const row = inventoryTableBody.insertRow(); // Insert a new row into the table body

        // Insert cells and populate them with product data
        row.insertCell(0).textContent = id;
        row.insertCell(1).textContent = name;
        row.insertCell(2).textContent = inStock ? 'In Stock' : 'Out of Stock'; // Display friendly status
        row.insertCell(3).textContent = `$${price.toFixed(2)}`; // Format price to 2 decimal places
        row.insertCell(4).textContent = category;

        // Apply a class based on stock status for visual indication
        if (!inStock) {
            row.classList.add('out-of-stock-row'); // You might add a specific CSS class for out-of-stock rows
        }
    });
};

/**
 * Checks the availability of a product based on user input (ID or Name).
 * Uses find and object destructuring for searching and accessing product properties.
 */
const checkAvailability = () => {
    const searchTerm = productSearchInput.value.trim();

    // Validate if the input is empty
    if (searchTerm === '') {
        displayTemporaryMessage('Please enter a Product ID or Name to check.', 'out-of-stock');
        return;
    }

    // Use Array.prototype.find() to search for the product.
    // The callback uses an arrow function and object destructuring.
    const foundProduct = products.find(product => {
        // Object destructuring within the find callback for cleaner access to properties
        const { id, name } = product;
        return id.toLowerCase() === searchTerm.toLowerCase() || name.toLowerCase() === searchTerm.toLowerCase();
    });

    // Display appropriate message based on search result
    if (foundProduct) {
        // Object destructuring here to get the inStock property
        const { name, inStock } = foundProduct;
        if (inStock) {
            displayTemporaryMessage(`${name} (ID: ${foundProduct.id}) is currently IN STOCK. `, 'in-stock');
        } else {
            displayTemporaryMessage(`${name} (ID: ${foundProduct.id}) is currently OUT OF STOCK.`, 'out-of-stock');
        }
    } else {
        displayTemporaryMessage(`"${searchTerm}" not found in inventory. `, 'out-of-stock');
    }

    productSearchInput.value = ''; // Clear the input field
};

// --- Event Listeners ---

// Add a click event listener to the "Check Availability" button
// Using an arrow function for the event handler
checkAvailabilityBtn.addEventListener('click', checkAvailability);

// --- Initial Load ---

// Fetch products and display inventory when the DOM is fully loaded
// Using an arrow function for the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', fetchProducts);