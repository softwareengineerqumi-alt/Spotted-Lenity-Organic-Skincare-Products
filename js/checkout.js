document.addEventListener('DOMContentLoaded', () => {
    renderCheckoutCart();
    setupCheckoutForm();
});

function renderCheckoutCart() {
    const container = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('cart-total-price');
    
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p style="opacity: 0.8; font-style: italic;">Your cart is currently empty.</p>';
        if (totalElement) totalElement.textContent = 'R0.00';
        return;
    }

    let html = '<ul style="list-style: none; padding: 0;">';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px dashed rgba(255,255,255,0.15); padding-bottom: 8px;">
                <div>
                    <strong style="font-size: 14px;">${item.name}</strong>
                    <div style="font-size: 12px; opacity: 0.8;">R${item.price} x ${item.quantity}</div>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-weight: 600;">R${itemTotal}</span>
                    <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ff6b6b; cursor: pointer; font-size: 14px;">✕</button>
                </div>
            </li>
        `;
    });

    html += '</ul>';
    container.innerHTML = html;
    if (totalElement) totalElement.textContent = `R${total.toFixed(2)}`;
}

function setupCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert('Your cart is empty! Add products before checking out.');
            return;
        }

        const name = form.querySelector('input[type="text"]').value;
        const phone = form.querySelector('input[type="tel"]').value;
        const courierSelect = form.querySelector('select');
        const courier = courierSelect.options[courierSelect.selectedIndex].text;
        const address = form.querySelector('textarea').value;

        let orderSummary = `*NEW ORDER - Spotted Lenity*\n\n`;
        orderSummary += `*Customer:* ${name}\n`;
        orderSummary += `*Phone:* ${phone}\n`;
        orderSummary += `*Courier:* ${courier}\n`;
        orderSummary += `*Address/Locker:* ${address}\n\n`;
        orderSummary += `*Items Ordered:*\n`;

        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            orderSummary += `- ${item.name} (x${item.quantity}) - R${itemTotal}\n`;
        });

        orderSummary += `\n*Total Amount:* R${total.toFixed(2)}`;

        // Clear cart after placing order
        localStorage.removeItem('spotted_lenity_cart');
        
        const encodedMessage = encodeURIComponent(orderSummary);
        window.location.href = `https://wa.me/27000000000?text=${encodedMessage}`;
    });
}
