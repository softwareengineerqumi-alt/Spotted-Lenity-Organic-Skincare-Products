// Shop Script: Connects "Add to Cart" buttons to the cart system

document.addEventListener('DOMContentLoaded', () => {
    setupAddToCartButtons();
});

function setupAddToCartButtons() {
    const addButtons = document.querySelectorAll('.liquid-product-card button');
    
    addButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.liquid-product-card');
            const name = card.querySelector('h3').textContent.trim();
            const priceText = card.querySelector('.price').textContent.trim();
            const price = parseFloat(priceText.replace('R', ''));

            addToCart(name, price);

            // Button Feedback Animation
            const originalText = button.textContent;
            button.textContent = 'Added! ✓';
            button.style.background = 'rgba(80, 97, 72, 0.9)';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 1200);
        });
    });
}
