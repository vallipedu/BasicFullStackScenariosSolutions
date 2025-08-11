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
var addProductMessage = document.getElementById('addProductMessage');

// Function to display the inventory
function displayInventory() {
    productList.innerHTML = '';
    for (var i = 0; i < dellProducts.length; i++) {
        var li = document.createElement('li');
        li.textContent = dellProducts[i];
        
        var removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.setAttribute('data-product', dellProducts[i]);
        removeBtn.onclick = function() {
            removeProduct(this.getAttribute('data-product'));
        };
        
        li.appendChild(removeBtn);
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
}

// Function to remove a product
function removeProduct(productToRemove) {
    var index = dellProducts.indexOf(productToRemove);
    if (index > -1) {
        dellProducts.splice(index, 1);
        addProductMessage.textContent = '"' + productToRemove + '" removed successfully. ✅';
        addProductMessage.style.color = '#dc3545';
        displayInventory();
    } else {
        addProductMessage.textContent = '"' + productToRemove + '" not found in inventory. ⚠️';
        addProductMessage.style.color = '#ffc107';
    }
}

// Event Listeners
addProductBtn.addEventListener('click', addProduct);

// Initial display of the inventory on page load
displayInventory();