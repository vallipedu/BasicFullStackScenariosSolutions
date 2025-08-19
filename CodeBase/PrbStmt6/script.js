/*
    File: script.js
    Author: HariBabu Mutchakala
    Version: 1.0
    Date: August 15, 2025
    Objective:
    This file contains all the JavaScript logic for the Dell E-commerce Inventory
    Management system. It handles fetching and parsing product data from an external
    JSON file, dynamically displaying the inventory in a table, and implementing a
    product availability check with temporary status messages. It utilizes modern
    JavaScript features like arrow functions, object destructuring, and array methods.
    It also demonstrates core concepts like hoisting, type coercion, and the rest/spread
    operators.
*/

// Hoisting Example: `products` is declared with `let`, so it's not fully hoisted
// to the top of the script's scope, avoiding a common hoisting pitfall.
let products = [];

// --- DOM Element References ---
// Using arrow functions for concise variable assignments
const productSearchInput = document.getElementById('product-search-input');
const checkAvailabilityBtn = document.getElementById('check-availability-btn');
const inventoryTableBody = document.querySelector('#inventory-table tbody');
const statusMessageDiv = document.getElementById('status-message');

// --- Functions ---

/**
 * Demonstrates the Rest Operator and Array Destructuring.
 * This function processes a variable number of product IDs to display.
 * @param {string} message - A base message string.
 * @param {Array<string>} ids - An array of IDs. The rest operator collects these.
 */
const logProductsByIds = (message, ...ids) => {
    // Array Destructuring: Extracting the first and last ID from the 'ids' array
    const [firstId, ...restIds] = ids;
    console.log(`Log Message: ${message}`);
    console.log(`First ID processed: ${firstId}`);
    // The restIds array contains all remaining IDs
    console.log(`Other IDs: ${restIds.join(', ')}`);
};

/**
 * Displays a temporary message to the user using Template Literals.
 * The message will fade out after a specified duration.
 * @param {string} message - The text content of the message.
 * @param {string} type - The type of message ('in-stock', 'out-of-stock').
 * @param {number} duration - How long the message should be visible in milliseconds.
 */
const displayTemporaryMessage = (message, type, duration = 3000) => {
    // Using a template literal for a clean, dynamic string
    statusMessageDiv.textContent = `${message}`;
    statusMessageDiv.className = type;
    statusMessageDiv.style.opacity = 1;

    setTimeout(() => {
        statusMessageDiv.style.opacity = 0;
        setTimeout(() => {
            statusMessageDiv.textContent = '';
            statusMessageDiv.className = '';
        }, 500);
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
        products = await response.json();
        displayInventory();
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
    inventoryTableBody.innerHTML = '';

    // Using forEach and object destructuring for readability
    products.forEach(product => {
        // Object destructuring to easily extract properties from each product object
        const { id, name, inStock, price, category } = product;

        // Spread Operator Example: Creating a copy of the product object to demonstrate non-mutation.
        const productCopy = { ...product };
        console.log('Original Product:', product);
        console.log('Product Copy (using spread):', productCopy);

        const row = inventoryTableBody.insertRow();
        
        // Type Coercion Example: price is a number, but it's coerced to a string when concatenated
        // with '$' inside a template literal.
        const formattedPrice = `$${price.toFixed(2)}`;

        row.insertCell(0).textContent = id;
        row.insertCell(1).textContent = name;
        row.insertCell(2).textContent = inStock ? 'In Stock' : 'Out of Stock';
        row.insertCell(3).textContent = formattedPrice;
        row.insertCell(4).textContent = category;
    });
};

/**
 * Checks the availability of a product based on user input (ID or Name).
 * Uses find and object destructuring for searching and accessing product properties.
 */
const checkAvailability = () => {
    const searchTerm = productSearchInput.value.trim();

    if (searchTerm === '') {
        displayTemporaryMessage('Please enter a Product ID or Name to check. ❗', 'out-of-stock');
        return;
    }

    // Using Array.prototype.find() with a callback that uses object destructuring and a template literal
    const foundProduct = products.find(product => {
        // Object destructuring within the find callback
        const { id, name } = product;
        return id.toLowerCase() === searchTerm.toLowerCase() || name.toLowerCase() === searchTerm.toLowerCase();
    });

    if (foundProduct) {
        // Object destructuring here to get the inStock property
        const { name, inStock } = foundProduct;
        const statusMessage = inStock ? 'IN STOCK.' : 'OUT OF STOCK.';
        const messageType = inStock ? 'in-stock' : 'out-of-stock';
        
        // Using a template literal for the message
        displayTemporaryMessage(`${name} is currently ${statusMessage}`, messageType);
        
        // Call the Rest operator example function
        logProductsByIds('A product was checked:', foundProduct.id);
    } else {
        displayTemporaryMessage(`"${searchTerm}" not found in inventory.`, 'out-of-stock');
    }

    productSearchInput.value = '';
};

// --- Event Listeners ---
// Using an arrow function for the event handler
checkAvailabilityBtn.addEventListener('click', checkAvailability);

// --- Initial Load ---
// Fetch products and display inventory when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', fetchProducts);