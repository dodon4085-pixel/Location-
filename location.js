// Replace with your Telegram Bot info
const TELEGRAM_BOT_TOKEN = "8589527391:AAEF3bCeKx0J-y9dc0KHeJCOolzHLJjYVo4"; // dummy
const TELEGRAM_CHAT_ID = "7681046220"; // dummy

// Send order + location details to Telegram
function sendOrderToTelegram(orderDetails) {
    // Capture geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            const message = `
📦 *New Order Received!*
Name: ${orderDetails.name}
Phone: ${orderDetails.phone}
Items: ${orderDetails.items.map(i => `${i.name} x${i.qty}`).join(', ')}
Total: ₹${orderDetails.total}
Location: [Map](https://www.google.com/maps?q=${lat},${lng})
            `;

            const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

            fetch(url)
                .then(res => {
                    if (res.ok) {
                        alert("Order sent to admin successfully!");
                    } else {
                        alert("Failed to send order.");
                    }
                })
                .catch(err => console.error("Telegram error:", err));
        }, err => {
            alert("Location permission denied. Order cannot be sent with location.");
            console.error(err);
        });
    } else {
        alert("Geolocation not supported by your browser.");
    }
}

// Example usage on checkout
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.length) {
        alert("Cart is empty!");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Dummy customer details (you can replace with a form)
    const customer = {
        name: "Biswajit Roy",
        phone: "9999999999",
        items: cart,
        total: total
    };

    sendOrderToTelegram(customer);

    // Clear cart
    localStorage.removeItem('cart');
    window.location.href = "index.html";
}
