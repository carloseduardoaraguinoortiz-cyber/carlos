const openButtons = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');
const galleryImgs = document.querySelectorAll('.gallery img');

function openModal(id) {
    const modal = document.getElementById(id);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    const box = modal.querySelector('.modal-box');
    box.style.animation = 'closeAnim .3s forwards';

    setTimeout(() => {
        modal.classList.remove('active');
        box.style.animation = '';
        if (!document.querySelector('.modal.active')) {
            document.body.style.overflow = '';
        }
    }, 300);
}

/* ABRIR */
openButtons.forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modal));
});

/* CERRAR */
document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', e => {
        closeModal(e.target.closest('.modal'));
    });
});

/* OVERLAY */
modals.forEach(modal => {
    modal.querySelector('.overlay').addEventListener('click', () => closeModal(modal));
});

/* ESC SOLO MODAL ACTIVO */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active:last-of-type');
        if (activeModal) closeModal(activeModal);
    }
});

/* FORM */
document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Formulario enviado correctamente ✔');
    closeModal(document.getElementById('modalForm'));
});

/* CONFIRM */
document.getElementById('confirmBtn').addEventListener('click', () => {
    alert('Acción confirmada 🚀');
    closeModal(document.getElementById('modalConfirm'));
});

/* IMAGEN */
galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
        document.getElementById('imgTitle').textContent = img.dataset.title;
        document.getElementById('imgDesc').textContent = img.dataset.desc;
        openModal('modalImage');
    });
});
