let products = JSON.parse(localStorage.getItem('products')) || [];

// Convert files to Base64 and save product
function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const desc = document.getElementById('productDesc').value;
    const imageFile = document.getElementById('productImage').files[0];
    const videoFile = document.getElementById('productVideo').files[0];

    if (!imageFile) {
        alert("Please upload an image!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const newProduct = {
            id: Date.now(),
            name,
            price,
            desc,
            image: e.target.result,
            video: null
        };

        // Handle video if exists
        if (videoFile) {
            const videoReader = new FileReader();
            videoReader.onload = function(e) {
                newProduct.video = e.target.result;
                saveProduct(newProduct);
            };
            videoReader.readAsDataURL(videoFile);
        } else {
            saveProduct(newProduct);
        }
    };
    reader.readAsDataURL(imageFile);
}

function saveProduct(product) {
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    alert('Product added successfully!');
    document.getElementById('productForm').reset();
}

// Load products on store page
function displayProducts() {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <img src="${product.image}" class="product-img" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price}</div>
            </div>
        </div>
    `).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});