// 1. Data Structure: Array of medicine products
const products = [
    { name: 'Paracetamol', price: 10.50, category: 'Pain Relief' },
    { name: 'Vitamin C Tablets', price: 25.00, category: 'Supplement' },
    { name: 'Amoxicillin', price: 30.00, category: 'Antibiotic' },
    { name: 'Multi-Vitamin Pack', price: 45.00, category: 'Supplement' },
    { name: 'Cough Syrup', price: 12.75, category: 'Cold & Flu' },
    { name: 'Omega-3 Capsules', price: 35.50, category: 'Supplement' },
    { name: 'Ibuprofen', price: 15.20, category: 'Pain Relief' },
    { name: 'Iron Supplements', price: 22.00, category: 'Supplement' }
];

// Get the tbody of the table for displaying products
const productListContainer = document.querySelector('#product-table tbody'); // Select the tbody
const noProductsMessage = document.getElementById('no-products-message');

/**
 * Calculates the discounted price for a given product.
 * @param {Object} product - The product object with 'price' property.
 * @returns {number} The discounted price.
 */
const calculateDiscountedPrice = (product) => {
    const discountPercentage = 0.15; // 15% discount
    return product.price * (1 - discountPercentage);
};

/**
 * Displays the list of products on the web page in a table format.
 * @param {Array<Object>} productsToDisplay - An array of product objects to display.
 */
const displayProducts = (productsToDisplay) => {
    if (productsToDisplay.length === 0) {
        // Show the 'no products found' message and clear the product list
        noProductsMessage.classList.remove('hidden');
        productListContainer.innerHTML = ''; // Clear any existing table rows
        return;
    }

    // Hide the 'no products found' message
    noProductsMessage.classList.add('hidden');

    // Clear any previously displayed products (table rows)
    productListContainer.innerHTML = '';

    // Iterate over each product and create its HTML table row
    productsToDisplay.forEach(product => {
        const tableRow = document.createElement('tr'); // Create a new table row

        // Populate the inner HTML of the row with product details in table data cells
        tableRow.innerHTML = `
            <td>${product.name}</td>
            <td><span class="original-price">₹${product.price.toFixed(2)}</span></td>
            <td><span class="discounted-price">₹${product.discountedPrice.toFixed(2)}</span></td>
            <td>${product.category}</td>
        `;
        // Append the created row to the table body
        productListContainer.appendChild(tableRow);
    });
};

// 2. Functional Requirements: Filter, Apply Discount, Display Results
// This section executes when the script loads.
// Use method chaining for filter() and map() for concise data processing.
const discountedSupplementProducts = products
    // Step 1: Filter the products array to include only 'Supplement' category items.
    .filter(product => product.category === 'Supplement')
    // Step 2: Map over the filtered products to create a new array.
    // For each product, copy its existing properties and add a new 'discountedPrice' property.
    .map(product => ({
        ...product, // Spreads all properties of the original product object
        discountedPrice: calculateDiscountedPrice(product) // Adds the calculated discounted price
    }));

// Display the final list of discounted supplement products on the page.
displayProducts(discountedSupplementProducts);
