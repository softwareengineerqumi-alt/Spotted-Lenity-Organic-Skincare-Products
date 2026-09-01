// Main Script: Manages shared functionality across all pages

document.addEventListener('DOMContentLoaded', () => {
    // Automatically update the cart badge on page load
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
});
