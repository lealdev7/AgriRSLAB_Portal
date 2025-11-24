function initializeNewsFilters() {
    const toggleButtons = document.querySelectorAll('.filter-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const dropdown = this.closest('.filter-dropdown');
            const isOpen = dropdown.classList.contains('open');
            document.querySelectorAll('.filter-dropdown.open').forEach(d => d.classList.remove('open'));
            if (!isOpen) dropdown.classList.add('open');
        });
    });

    const applyButtons = document.querySelectorAll('.btn-apply-filter');

    function applyFilters() {
        const allCards = document.querySelectorAll('.news-card');
        
        const categoryDropdown = document.querySelector('[data-filter-name="categoria"]');
        const checkedCategories = categoryDropdown
            ? Array.from(categoryDropdown.querySelectorAll('input[type="checkbox"]:checked')).map(c => c.value)
            : [];

        const yearDropdown = document.querySelector('[data-filter-name="ano"]');
        const yearTerm = yearDropdown
            ? yearDropdown.querySelector('.filter-input-text').value.trim()
            : '';

        allCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardYear = card.getAttribute('data-year');

            const matchCategory = checkedCategories.length === 0 || checkedCategories.includes(cardCategory);
            const matchYear = yearTerm === '' || cardYear.includes(yearTerm);

            card.style.display = (matchCategory && matchYear) ? 'flex' : 'none';
        });
    }

    applyButtons.forEach(button => {
        button.addEventListener('click', () => {
            applyFilters();
            const dropdown = button.closest('.filter-dropdown');
            if (dropdown) dropdown.classList.remove('open');
        });
    });

    const inputYear = document.querySelector('[data-filter-name="ano"] .filter-input-text');
    if (inputYear) {
        inputYear.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                applyFilters();
                const dropdown = inputYear.closest('.filter-dropdown');
                if (dropdown) dropdown.classList.remove('open');
            }
        });
    }

    // Fechar dropdowns ao clicar fora
    document.addEventListener('click', (event) => {
        const openDropdown = document.querySelector('.filter-dropdown.open');
        if (openDropdown && !openDropdown.contains(event.target)) {
            openDropdown.classList.remove('open');
        }
    });
}

document.addEventListener('newsLoaded', initializeNewsFilters);