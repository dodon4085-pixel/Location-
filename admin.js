// --- Admin Authentication Check ---
(function() {
    const adminKey = localStorage.getItem('adminAccess');
    if (!adminKey || adminKey !== 'granted') {
        alert("Unauthorized! Redirecting...");
        window.location.href = "index.html";
    }
})();

// --- Load Products ---
let products = JSON.parse(localStorage.getItem('products')) || [];

function renderProducts() {
    const tbody = document.querySelector('#productsTable tbody');
    tbody.innerHTML = '';
    products.forEach(product => {
        tbody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>₹${product.price}</td>
                <td>${product.category}</td>
                <td>
                    <button class="action-btn" onclick="editProduct(${product.id})"><i class="fas fa-edit"></i></button>
                    <button class="action-btn" onclick="deleteProduct(${product.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

// --- Add / Update Product ---
const productForm = document.getElementById('productForm');
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('editProductId').value;
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const originalPrice = parseFloat(document.getElementById('productOriginalPrice').value) || null;
    const discount = parseFloat(document.getElementById('productDiscount').value) || null;
    const category = document.getElementById('productCategory').value;
    const img = document.getElementById('productImg').value || 'images/default.jpg';

    if (id) {
        // Update existing
        const index = products.findIndex(p => p.id == id);
        products[index] = { id: parseInt(id), name, price, originalPrice, discount, category, img };
        alert("Product updated!");
    } else {
        // Add new
        const newId = products.length ? products[products.length - 1].id + 1 : 1;
        products.push({ id: newId, name, price, originalPrice, discount, category, img });
        alert("Product added!");
    }

    localStorage.setItem('products', JSON.stringify(products));
    productForm.reset();
    document.getElementById('editProductId').value = '';
    renderProducts();
});

// --- Edit Product ---
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('editProductId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productOriginalPrice').value = product.originalPrice || '';
    document.getElementById('productDiscount').value = product.discount || '';
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productImg').value = product.img;
}

// --- Delete Product ---
function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    products = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
}

// --- Load Orders ---
let orders = JSON.parse(localStorage.getItem('orders')) || [];

function renderOrders() {
    const tbody = document.querySelector('#ordersTable tbody');
    tbody.innerHTML = '';
    orders.forEach(order => {
        tbody.innerHTML += `
            <tr>
                <td>${order.id}</td>
                <td>${order.name} (${order.phone})</td>
                <td>${order.items.map(i => `${i.name} x${i.qty}`).join(', ')}</td>
                <td>₹${order.total}</td>
                <td><a href="https://www.google.com/maps?q=${order.lat},${order.lng}" target="_blank">View Map</a></td>
            </tr>
        `;
    });
}

// --- Logout Admin ---
function logoutAdmin() {
    localStorage.removeItem('adminAccess');
    window.location.href = "index.html";
}

// --- Initialize Admin Panel ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderOrders();
});
