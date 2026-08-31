// Checkout Form Processing for Spotted Lenity

document.addEventListener('DOMContentLoaded', () => {
    initializeCheckoutForm();
});

function initializeCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const cart = typeof getCart === 'function' ? getCart() : [];

            if (cart.length === 0) {
                alert('Your cart is empty. Please add items before checking out.');
                return;
            }

            // Gather Customer Details
            const customerData = {
                name: document.getElementById('cust-name').value.trim(),
                email: document.getElementById('cust-email').value.trim(),
                phone: document.getElementById('cust-phone').value.trim(),
                address: document.getElementById('cust-address').value.trim(),
                cart: cart,
                total: typeof calculateCartTotal === 'function' ? calculateCartTotal() : 0
            };

            // Store order details temporarily for reference page
            const orderRef = 'ORD-' + Date.now();
            sessionStorage.setItem('spotted_lenity_last_order', JSON.stringify({
                ref: orderRef,
                details: customerData
            }));

            // Clear Cart in LocalStorage
            localStorage.removeItem('spotted_lenity_cart');

            // Redirect to Order Confirmation
            window.location.href = 'success.html';
        });
    }
}
// Checkout Form Processing for Spotted Lenity

document.addEventListener('DOMContentLoaded', () => {
    initializeCheckoutForm();
});

function initializeCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const cart = typeof getCart === 'function' ? getCart() : [];

            if (cart.length === 0) {
                alert('Your cart is empty. Please add items before checking out.');
                return;
            }

            // Gather Customer Details
            const customerData = {
                name: document.getElementById('cust-name').value.trim(),
                email: document.getElementById('cust-email').value.trim(),
                phone: document.getElementById('cust-phone').value.trim(),
                address: document.getElementById('cust-address').value.trim(),
                cart: cart,
                total: typeof calculateCartTotal === 'function' ? calculateCartTotal() : 0
            };

            // Store order details temporarily for reference page
            const orderRef = 'ORD-' + Date.now();
            sessionStorage.setItem('spotted_lenity_last_order', JSON.stringify({
                ref: orderRef,
                details: customerData
            }));

            // Clear Cart in LocalStorage
            localStorage.removeItem('spotted_lenity_cart');

            // Redirect to Order Confirmation
            window.location.href = 'success.html';
        });
    }
}
