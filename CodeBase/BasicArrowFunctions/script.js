// script.js

const medicines = [
    { id: 'med001', name: 'Paracetamol', price: 50.00, count: 2 },
    { id: 'med002', name: 'Amoxicillin', price: 120.50, count: 1 },
    { id: 'med003', name: 'Omeprazole', price: 80.75, count: 3 },
    { id: 'med004', name: 'Vitamin C Tablets', price: 200.00, count: 1 },
    { id: 'med005', name: 'Cough Syrup', price: 150.00, count: 2 },
    { id: 'med006', name: 'Insulin Pen', price: 1500.00, count: 1 },
];

const cartItemsTbody = document.getElementById('cart-items');
const totalAmountDueDiv = document.getElementById('total-amount-due');

// --- Display each item in the cart using forEach ---
medicines.forEach(product => {
    const row = document.createElement('tr');
    const productTotal = product.price * product.count;
    row.innerHTML = `
        <td>${product.name}</td>
        <td>₹${product.price.toFixed(2)}</td>
        <td>${product.count}</td>
        <td>₹${productTotal.toFixed(2)}</td>
    `;
    cartItemsTbody.appendChild(row);
});

// --- Calculate the total amount using reduce ---
const totalAmount = medicines.reduce((accumulator, currentProduct) => {
    return accumulator + (currentProduct.price * currentProduct.count);
}, 0);

// --- Display the final total amount ---
totalAmountDueDiv.textContent = `Total Amount Due: ₹${totalAmount.toFixed(2)}`;