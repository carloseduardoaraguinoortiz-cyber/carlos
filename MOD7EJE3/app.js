// Seleccionamos el contenedor y los items
const grid = document.querySelector('.grid-container');
const allItems = document.querySelectorAll('.grid-item');

function resizeGridItems() {
    allItems.forEach(item => {
        const rowHeight = parseInt(getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        const rowGap = parseInt(getComputedStyle(grid).getPropertyValue('gap'));
        const itemHeight = item.querySelector('figure').getBoundingClientRect().height 
                         + item.querySelector('.card-content').getBoundingClientRect().height;
        const rowSpan = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));
        item.style.gridRowEnd = `span ${rowSpan}`;
    });
}

// Ejecutar al cargar y al redimensionar
window.addEventListener('load', resizeGridItems);
window.addEventListener('resize', resizeGridItems);
