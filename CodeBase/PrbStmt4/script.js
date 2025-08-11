// Define the Dell product catalog as an empty array initially
var productCatalog = [];

// Get references to HTML elements
var checkAvailabilityButton = document.getElementById('checkAvailabilityBtn');
var inventoryDisplayDiv = document.getElementById('inventoryDisplay');
var productIdOrNameInput = document.getElementById('productIdOrName');
var availabilityStatusDiv = document.getElementById('availabilityStatus');

/**
 * Clears the content of a specified HTML element.
 * @param {HTMLElement} element - The HTML element to clear.
 */
function clearElementContent(element) {
    element.innerHTML = '';
}

/**
 * Fetches product data from products.json and populates the productCatalog array.
 */
async function loadProducts() {
    try {
        console.log("Attempting to load products from products.json...");
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        productCatalog = await response.json();
        console.log("Products loaded successfully:", productCatalog.length, "items.");
        // After loading, display the inventory
        displayInventory();
    } catch (error) {
        console.error("Failed to load products:", error);
        inventoryDisplayDiv.innerHTML = '<p style="color: red; text-align: center;">Error loading inventory. Please check the products.json file and ensure it is in the same directory.</p>';
        availabilityStatusDiv.innerHTML = '<p class="text-red-700 font-semibold">Error: Could not load product data.</p>';
        setTimeout(function() {
            clearElementContent(availabilityStatusDiv);
        }, 3000);
    }
}

/**
 * Displays a complete list of all products in the inventory.
 * Renders a table with product properties.
 */
function displayInventory() {
    console.log("displayInventory function called!"); // Added for debugging

    // Clear previous display
    clearElementContent(inventoryDisplayDiv);

    if (productCatalog.length === 0) {
        inventoryDisplayDiv.innerHTML = '<p class="text-gray-500 text-center">No products in inventory.</p>';
        return;
    }

    // Add a class for the table for general styling
    var tableHTML = '<table class="inventory-table">';
    tableHTML += '<thead><tr><th>ID</th><th>Name</th><th>Status</th><th>Price</th><th>Category</th></tr></thead>';
    tableHTML += '<tbody>';

    for (var i = 0; i < productCatalog.length; i++) {
        var product = productCatalog[i];
        // Use custom CSS classes for status text
        var statusClass = product.inventoryStatus ? 'text-green-600' : 'text-red-600';
        var statusText = '<span class="' + statusClass + ' font-medium">' + (product.inventoryStatus ? 'In Stock' : 'Out of Stock') + '</span>';
        // Changed price formatting to Indian Rupees
        var priceFormatted = '₹' + product.price.toFixed(2);

        // Add class for alternating row colors based on index
        var rowClass = (i % 2 === 0) ? 'row-even' : 'row-odd';
        tableHTML += '<tr class="' + rowClass + '">';
        tableHTML += '<td>' + product.productId + '</td>';
        tableHTML += '<td>' + product.productName + '</td>';
        tableHTML += '<td>' + statusText + '</td>';
        tableHTML += '<td>' + priceFormatted + '</td>';
        tableHTML += '<td>' + product.category + '</td>';
        tableHTML += '</tr>';
    }

    tableHTML += '</tbody></table>';
    inventoryDisplayDiv.innerHTML = tableHTML;
}

/**
 * Checks the availability of a product based on its ID or name.
 * Displays the status in the availabilityStatusDiv and clears it after a delay.
 */
function checkAvailability() {
    var searchTerm = productIdOrNameInput.value.trim();
    clearElementContent(availabilityStatusDiv); // Clear any existing message immediately

    if (searchTerm === '') {
        availabilityStatusDiv.innerHTML = '<p class="text-orange-600">Please enter a Product ID or Name to search.</p>';
        // Clear message after 3 seconds
        setTimeout(function() {
            clearElementContent(availabilityStatusDiv);
        }, 3000);
        return;
    }

    var foundProduct = null;
    for (var i = 0; i < productCatalog.length; i++) {
        var product = productCatalog[i];
        // Case-insensitive search for both ID and Name
        if (product.productId.toLowerCase() === searchTerm.toLowerCase() ||
            product.productName.toLowerCase() === searchTerm.toLowerCase()) {
            foundProduct = product;
            break;
        }
    }

    if (foundProduct) {
        if (foundProduct.inventoryStatus) {
            availabilityStatusDiv.innerHTML = '<p class="text-green-700 font-semibold">"' + foundProduct.productName + '" (' + foundProduct.productId + ') is <span class="text-green-800">IN STOCK!</span> 🎉</p>';
        } else {
            availabilityStatusDiv.innerHTML = '<p class="text-red-700 font-semibold">"' + foundProduct.productName + '" (' + foundProduct.productId + ') is <span class="text-red-800">OUT OF STOCK.</span> 😔</p>';
        }
    } else {
        availabilityStatusDiv.innerHTML = '<p class="text-red-700 font-semibold">Product "' + searchTerm + '" not found in inventory. Please check the ID or Name.</p>';
    }

    // Set a timeout to clear the message after 3 seconds (3000 milliseconds)
    setTimeout(function() {
        clearElementContent(availabilityStatusDiv);
    }, 3000); // Message will disappear after 3 seconds
}

// Add event listener to the check availability button
checkAvailabilityButton.addEventListener('click', checkAvailability);

// Initial load of products and display of inventory when the page loads
window.onload = function() {
    loadProducts(); // Call loadProducts, which then calls displayInventory
};
