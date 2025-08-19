// Define the Dell product catalog as an array of objects
var productCatalog = [
    {
        productId: 'D-XPS-15-001',
        productName: 'Dell XPS 15',
        inventoryStatus: true,
        price: 1899.99,
        category: 'Laptop'
    },
    {
        productId: 'D-ULTRA-27-005',
        productName: 'Dell UltraSharp U2723QE',
        inventoryStatus: true,
        price: 649.00,
        category: 'Monitor'
    },
    {
        productId: 'D-GAMING-KEY-010',
        productName: 'Dell Alienware Gaming Keyboard AW510K',
        inventoryStatus: false,
        price: 129.99,
        category: 'Accessory'
    },
    {
        productId: 'D-INSPIRON-14-015',
        productName: 'Dell Inspiron 14',
        inventoryStatus: true,
        price: 799.50,
        category: 'Laptop'
    },
    {
        productId: 'D-SOUND-BAR-020',
        productName: 'Dell Soundbar SB521A',
        inventoryStatus: true,
        price: 99.00,
        category: 'Accessory'
    }
];

// Get references to HTML elements
// Removed reference to displayInventoryButton as it's no longer needed in HTML for initial display
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
        var priceFormatted = '&#x20B9;' + product.price.toFixed(2);

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

// Add event listeners to the buttons
// Removed event listener for displayInventoryButton as it's no longer needed for default display
checkAvailabilityButton.addEventListener('click', checkAvailability);

// Initial display of inventory when the page loads (Test Case 1.1)
window.onload = function() {
    displayInventory();
};