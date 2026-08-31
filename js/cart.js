// Shopping Cart Management for Spotted Lenity

const CART_STORAGE_KEY = 'spotted_lenity_cart';

// Initialize Cart System
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    bindAddToCartButtons();
    renderCartIfOnCheckout();
});

// Retrieve cart from localStorage
function getCart() {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
}

// Add product to cart
function addToCart(id, name, price) {
    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === id);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: parseFloat(price),
            quantity: 1
        });
    }

    saveCart(cart);
    alert(`${name} has been added to your cart.`);
}

// Update quantity of a product
function updateItemQuantity(id, newQuantity) {
    let cart = getCart();
    const parsedQty = parseInt(newQuantity, 10);

    if (parsedQty <= 0) {
        removeFromCart(id);
        return;
    }

    cart = cart.map(item => {
        if (item.id === id) {
            item.quantity = parsedQty;
        }
        return item;
    });

    saveCart(cart);
    renderCartIfOnCheckout();
}

// Remove item from cart
function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    renderCartIfOnCheckout();
}

// Calculate Total Amount
function calculateCartTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Update Header Cart Count Badge
function updateCartBadge() {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = totalCount;
    }
}

// Event listener setup for Add to Cart buttons
function bindAddToCartButtons() {
    const buttons = document.querySelectorAll('.add-to-cart-btn[data-id]');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = button.getAttribute('data-price');
            addToCart(id, name, price);
        });
    });
}

// Render cart contents dynamically on checkout.html
function renderCartIfOnCheckout() {
    const container = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('cart-total-amount');

    if (!container || !totalElement) return;

    const cart = getCart();

    if (cart.length === 0) {
        container.innerHTML = '<p style="color: var(--text-dark-brown); font-size: 14px;">Your cart is currently empty.</p>';
        totalElement.textContent = 'R0.00';
        return;
    }

    let html = '<div style="display: flex; flex-direction: column; gap: 15px;">';

    cart.forEach(item => {
        const itemSubtotal = (item.price * item.quantity).toFixed(2);
        html += `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--accent-terracotta); padding-bottom: 12px;">
                <div>
                    <div style="font-weight: 600; font-size: 14px; color: var(--text-dark-brown);">${item.name}</div>
                    <div style="font-size: 12px; color: var(--text-deep-rust);">R${item.price.toFixed(2)} each</div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <input type="number" min="1" value="${item.quantity}" onchange="updateItemQuantity('${item.id}', this.value)" style="width: 50px; padding: 5px; text-align: center; border: 1px solid var(--accent-terracotta);">
                    <span style="font-weight: 600; font-size: 14px; min-width: 60px; text-align: right; color: var(--text-dark-brown);">R${itemSubtotal}</span>
                    <button onclick="removeFromCart('${item.id}')" style="background: none; border: none; color: var(--accent-orange-burnt); cursor: pointer; font-size: 12px; margin-left: 5px;">Remove</button>
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
    totalElement.textContent = `R${calculateCartTotal().toFixed(2)}`;
}
