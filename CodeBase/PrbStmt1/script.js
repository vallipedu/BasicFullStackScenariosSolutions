var dellProducts = [
    "Dell XPS 13",
    "Dell Inspiron 15",
    "Dell Alienware m16",
    "Dell G15 Gaming Laptop",
    "Dell S2721D Monitor"
];

var productList = document.getElementById('productList');
var addProductBtn = document.getElementById('addProductBtn');
var productNameInput = document.getElementById('productName');
var checkAvailabilityBtn = document.getElementById('checkAvailabilityBtn');
var checkNameInput = document.getElementById('checkName');
var addProductMessage = document.getElementById('addProductMessage'); // New variable
var availabilityMessage = document.getElementById('availabilityMessage');

// Function to display the inventory
function displayInventory() {
    productList.innerHTML = '';
    for (var i = 0; i < dellProducts.length; i++) {
        var li = document.createElement('li');
        li.textContent = dellProducts[i];
        productList.appendChild(li);
    }
}

// Function to add a product
function addProduct() {
    var newProduct = productNameInput.value.trim();
    if (newProduct && dellProducts.indexOf(newProduct) === -1) {
        dellProducts.push(newProduct);
        addProductMessage.textContent = '"' + newProduct + '" added successfully. ✅';
        addProductMessage.style.color = '#28a745';
        displayInventory();
        productNameInput.value = '';
    } else if (dellProducts.indexOf(newProduct) !== -1) {
        addProductMessage.textContent = '"' + newProduct + '" already exists in the inventory. ❌';
        addProductMessage.style.color = '#dc3545';
    } else {
        addProductMessage.textContent = 'Please enter a product name. ⚠️';
        addProductMessage.style.color = '#ffc107';
    }
    availabilityMessage.textContent = ''; // Clear the other message
}

// Function to check product availability
function checkAvailability() {
    var productToCheck = checkNameInput.value.trim();
    if (productToCheck) {
        var isAvailable = false;
        for (var i = 0; i < dellProducts.length; i++) {
            if (dellProducts[i].toLowerCase() === productToCheck.toLowerCase()) {
                isAvailable = true;
                break;
            }
        }
        if (isAvailable) {
            availabilityMessage.textContent = '"' + productToCheck + '" is in stock. ✅';
            availabilityMessage.style.color = '#28a745';
        } else {
            availabilityMessage.textContent = '"' + productToCheck + '" is out of stock. ❌';
            availabilityMessage.style.color = '#dc3545';
        }
    } else {
        availabilityMessage.textContent = 'Please enter a product name to check. ⚠️';
        availabilityMessage.style.color = '#ffc107';
    }
    checkNameInput.value = '';
    addProductMessage.textContent = ''; // Clear the other message
}

// Event Listeners
addProductBtn.addEventListener('click', addProduct);
checkAvailabilityBtn.addEventListener('click', checkAvailability);

// Initial display of the inventory on page load
displayInventory();