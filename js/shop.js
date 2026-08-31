// Shop Page Script for SKINSHO

document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
});

// Setup hero search input listener
function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchInput && searchBtn) {
        const executeSearch = () => {
            const query = searchInput.value.trim().toLowerCase();
            if (query !== '') {
                filterProducts(query);
            }
        };

        searchBtn.addEventListener('click', executeSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                executeSearch();
            }
        });
    }
}

// Simple product search filter matching text
function filterProducts(query) {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const titleElement = card.querySelector('.product-title');
        if (titleElement) {
            const title = titleElement.textContent.toLowerCase();
            if (title.includes(query)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        }
    });
}
