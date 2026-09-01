// Cart State Management
let cart = JSON.parse(localStorage.getItem('spotted_lenity_cart')) || [];

function updateCartCount() {
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
    }
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    localStorage.setItem('spotted_lenity_cart', JSON.stringify(cart));
    updateCartCount();
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('spotted_lenity_cart', JSON.stringify(cart));
    updateCartCount();
    if (typeof renderCheckoutCart === 'function') {
        renderCheckoutCart();
    }
};
