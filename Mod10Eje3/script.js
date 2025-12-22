const products = [
    { id: 1, name: "MacBook Air M2", category: "electronics", price: 999, rating: 5, img: "https://source.unsplash.com/250x180/?laptop" },
    { id: 2, name: "Sudadera Oversize", category: "clothing", price: 45, rating: 4, img: "https://source.unsplash.com/250x180/?sweater" },
    { id: 3, name: "Cafetera Espresso", category: "home", price: 120, rating: 4, img: "https://source.unsplash.com/250x180/?coffee" },
    { id: 4, name: "Teclado Mecánico", category: "electronics", price: 85, rating: 5, img: "https://source.unsplash.com/250x180/?keyboard" },
    { id: 5, name: "Pantalón Denim", category: "clothing", price: 60, rating: 3, img: "https://source.unsplash.com/250x180/?jeans" },
    { id: 6, name: "Lámpara de Pie", category: "home", price: 35, rating: 2, img: "https://source.unsplash.com/250x180/?lamp" },
    { id: 7, name: "iPhone 15", category: "electronics", price: 800, rating: 5, img: "https://source.unsplash.com/250x180/?phone" },
    { id: 8, name: "Zapatillas Running", category: "clothing", price: 110, rating: 4, img: "https://source.unsplash.com/250x180/?shoes" },
    { id: 9, name: "Set de Cuchillos", category: "home", price: 75, rating: 3, img: "https://source.unsplash.com/250x180/?knife" },
    { id: 10, name: "Monitor 4K", category: "electronics", price: 400, rating: 4, img: "https://source.unsplash.com/250x180/?monitor" }
];

const ITEMS_PER_PAGE = 3;
const form = document.getElementById('filterForm');
const resultsGrid = document.getElementById('resultsGrid');
const resultsCount = document.getElementById('resultsCount');
const pageInfo = document.getElementById('pageInfo');
const priceLabel = document.getElementById('priceLabel');

function debounce(func, delay = 400) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function syncFiltersToURL() {
    const formData = new FormData(form);
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
        if (value && value !== "0") params.set(key, value);
    });
    params.set('page', '1');
    window.history.pushState(null, '', window.location.pathname + '?' + params.toString());
    render();
}

function render() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q')?.toLowerCase() || "";
    const category = params.get('category') || "";
    const maxPrice = parseInt(params.get('maxPrice')) || 1000;
    const rating = parseInt(params.get('rating')) || 0;
    let page = parseInt(params.get('page')) || 1;

    const filtered = products.filter(item => 
        item.name.toLowerCase().includes(q) &&
        (category === "" || item.category === category) &&
        item.price <= maxPrice &&
        item.rating >= rating
    );

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
    if (page > totalPages) page = totalPages;

    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const itemsToShow = filtered.slice(start, end);

    resultsGrid.innerHTML = itemsToShow.length > 0
        ? itemsToShow.map(p => `
            <article class="card">
                <img src="${p.img}" alt="${p.name}">
                <h4>${p.name}</h4>
                <p><strong>Precio:</strong> $${p.price}</p>
                <p><small>Categoría: ${p.category}</small></p>
                <p>⭐ ${p.rating} / 5</p>
            </article>
        `).join('')
        : `<p style="grid-column:1/-1; text-align:center; font-weight:bold;">No se encontraron productos con esos filtros.</p>`;

    resultsCount.innerText = `${filtered.length} productos encontrados`;
    pageInfo.innerText = `Página ${page} de ${totalPages}`;

    document.getElementById('prevBtn').disabled = (page <= 1);
    document.getElementById('nextBtn').disabled = (page >= totalPages);

    priceLabel.innerText = `$${maxPrice}`;
}

// EVENTOS
document.getElementById('search').addEventListener('input', debounce(syncFiltersToURL));
form.addEventListener('change', e => { if(e.target.id!=='search') syncFiltersToURL(); });

function changePage(offset) {
    const params = new URLSearchParams(window.location.search);
    let currentPage = parseInt(params.get('page')) || 1;
    params.set('page', currentPage + offset);
    window.history.pushState(null, '', `?${params.toString()}`);
    render();
}

document.getElementById('prevBtn').addEventListener('click', () => changePage(-1));
document.getElementById('nextBtn').addEventListener('click', () => changePage(1));

document.getElementById('clearBtn').addEventListener('click', () => {
    form.reset();
    window.history.pushState(null, '', window.location.pathname);
    render();
});

window.addEventListener('popstate', render);

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    params.forEach((value, key) => {
        const input = form.elements[key];
        if (input) {
            if (input.type === 'radio') {
                if (input.value === value) input.checked = true;
            } else {
                input.value = value;
            }
        }
    });
    render();
});
