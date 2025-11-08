const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const productList = document.getElementById('product-list');
db.collection('products').get().then(snapshot => {
  snapshot.forEach(doc => {
    const product = doc.data();
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" width="150">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart('${doc.id}')">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
});
let cart = [];
function addToCart(id) {
  cart.push(id);
  alert('Added to cart');
}