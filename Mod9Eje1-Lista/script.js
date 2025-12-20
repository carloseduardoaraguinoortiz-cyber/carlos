const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const itemList = document.getElementById('itemList');
const itemCount = document.getElementById('itemCount');
const clearAllBtn = document.getElementById('clearAllBtn');
const toast = document.getElementById('toast');

function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

function updateCount() {
    itemCount.textContent = itemList.children.length;
}

function createItem(text) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${text}</span>
        <div class="item-buttons">
            <button class="edit">✏️</button>
            <button class="delete">🗑</button>
        </div>
    `;
    return li;
}

addBtn.addEventListener('click', () => {
    const text = itemInput.value.trim();
    if (!text) {
        showToast('Escribe algo primero');
        return;
    }
    const item = createItem(text);
    itemList.appendChild(item);
    itemInput.value = '';
    updateCount();
    showToast('Item añadido');
});

itemList.addEventListener('click', e => {
    const li = e.target.closest('li');
    if (!li) return;

    if (e.target.classList.contains('delete')) {
        li.remove();
        updateCount();
        showToast('Item eliminado');
    }

    if (e.target.classList.contains('edit')) {
        const span = li.querySelector('span');
        const nuevo = prompt('Editar item', span.textContent);
        if (nuevo) {
            span.textContent = nuevo;
            showToast('Item actualizado');
        }
    }
});

clearAllBtn.addEventListener('click', () => {
    if (!itemList.children.length) {
        showToast('La lista está vacía');
        return;
    }
    itemList.innerHTML = '';
    updateCount();
    showToast('Lista limpiada');
});
