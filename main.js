// --- Product Data ---
const products = [
    {
        id: 1,
        name: "Smartphone XYZ",
        category: "electronics",
        price: 7999,
        originalPrice: 8999,
        discount: 11,
        rating: 4.3,
        img: "images/product1.jpg"
    },
    {
        id: 2,
        name: "Men's T-Shirt",
        category: "fashion",
        price: 499,
        originalPrice: 699,
        discount: 28,
        rating: 4.5,
        img: "images/product2.jpg"
    },
    {
        id: 3,
        name: "Blender 3000",
        category: "home",
        price: 1499,
        originalPrice: 1999,
        discount: 25,
        rating: 4.1,
        img: "images/product3.jpg"
    },
    {
        id: 4,
        name: "Organic Honey",
        category: "grocery",
        price: 299,
        rating: 4.7,
        img: "images/product4.jpg"
    },
    {
        id: 5,
        name: "Smart Watch",
        category: "electronics",
        price: 3499,
        rating: 4.2,
        img: "images/product5.jpg"
    },
    {
        id: 6,
        name: "Women's Saree",
        category: "fashion",
        price: 1299,
        rating: 4.6,
        img: "images/product6.jpg"
    }
];

// --- Categories Data ---
const categories = [
    { name: "Electronics", icon: "fas fa-mobile-alt", category: "electronics" },
    { name: "Fashion", icon: "fas fa-tshirt", category: "fashion" },
    { name: "Home & Kitchen", icon: "fas fa-home", category: "home" },
    { name: "Groceries", icon: "fas fa-utensils", category: "grocery" },
    { name: "Beauty", icon: "fas fa-heartbeat", category: "beauty" },
    { name: "Sports", icon: "fas fa-dumbbell", category: "sports" }
];

// --- Cart Handling ---
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    let cart = getCart();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart(cart);
    updateCartCount();
    alert(`${product.name} added to cart`);
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((acc, item) => acc + item.qty, 0);
    const counterEl = document.getElementById('headerCartCount');
    if (counterEl) counterEl.textContent = count;
}

// --- Render Products ---
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    const featured = products.slice(0, 4);
    container.innerHTML = featured.map(product => `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-rating"><i class="fas fa-star"></i> ${product.rating}</div>
                <div class="product-price">
                    ₹${product.price} 
                    ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
                    ${product.discount ? `<span class="discount">${product.discount}% off</span>` : ''}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// --- Render Categories ---
function loadCategories() {
    const container = document.getElementById('categoryCarousel');
    if (!container) return;

    container.innerHTML = categories.map(cat => `
        <div class="category-item" onclick="filterCategory('${cat.category}')">
            <div class="category-icon"><i class="${cat.icon}"></i></div>
            <div class="category-name">${cat.name}</div>
        </div>
    `).join('');
}

// --- Category Filter ---
function filterCategory(category) {
    window.location.href = `products.html?category=${category}`;
}

// --- Search Products ---
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value;
    if (searchTerm.trim()) {
        window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

// --- Login Modal ---
function toggleLogin() {
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
}

// --- Login Form ---
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    loadCategories();
    updateCartCount();

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Login functionality coming soon!');
            closeLogin();
        });
    }
});
