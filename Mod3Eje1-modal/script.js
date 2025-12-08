const openBtn = document.querySelector('.btn-open');
const overlay = document.getElementById('modalOverlay');
const closeBtn = document.querySelector('.btn-close');
const actionBtn = document.querySelector('.btn-modal-action');

// Abrir modal
openBtn.addEventListener('click', () => overlay.classList.add('active'));

// Cerrar modal
closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
actionBtn.addEventListener('click', () => overlay.classList.remove('active'));

// Cerrar al hacer clic fuera del modal
overlay.addEventListener('click', e => {
    if(e.target === overlay) overlay.classList.remove('active');
});
