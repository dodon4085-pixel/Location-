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
const ADMIN_PASSWORD = "Dinhata@123";
function loginAdmin() {
  const pass = document.getElementById('admin-password').value;
  if(pass === ADMIN_PASSWORD){
    document.getElementById('login-div').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    loadProducts();
  } else alert('Wrong password');
}
function addProduct() {
  const name = document.getElementById('pname').value;
  const price = document.getElementById('pprice').value;
  const image = document.getElementById('pimage').value;
  db.collection('products').add({name, price, image}).then(()=>{
    alert('Product added');
    loadProducts();
  });
}
function loadProducts(){
  const existing = document.getElementById('existing-products');
  existing.innerHTML='';
  db.collection('products').get().then(snapshot=>{
    snapshot.forEach(doc=>{
      const p = doc.data();
      const div = document.createElement('div');
      div.innerHTML = `<p>${p.name} - ₹${p.price}</p><button onclick="deleteProduct('${doc.id}')">Delete</button>`;
      existing.appendChild(div);
    });
  });
}
function deleteProduct(id){
  db.collection('products').doc(id).delete().then(()=> loadProducts());
}