const buttons = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

function switchTab(id) {
    buttons.forEach(b => b.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    document.querySelector(`[data-tab="${id}"]`).classList.add('active');
    document.getElementById(id).classList.add('active');

    localStorage.setItem('tabActivo', id);
}

// Click
buttons.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// Teclado
document.addEventListener('keydown', e => {
    const activeIndex = [...buttons].findIndex(b => b.classList.contains('active'));

    if (e.key === 'ArrowRight') {
        const next = (activeIndex + 1) % buttons.length;
        switchTab(buttons[next].dataset.tab);
    }

    if (e.key === 'ArrowLeft') {
        const prev = (activeIndex - 1 + buttons.length) % buttons.length;
        switchTab(buttons[prev].dataset.tab);
    }
});

// Cargar último tab
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('tabActivo') || 'tab1';
    switchTab(saved);
});
