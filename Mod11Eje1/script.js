// ================================
// FUNCIONES AUXILIARES
// ================================

// Muestra mensajes y desaparecen después de 2 segundos
function showMessage(element, html) {
    element.innerHTML = html;
    element.style.opacity = 1;
    element.classList.remove('message-hide'); // Reinicia animación
    setTimeout(() => {
        element.classList.add('message-hide'); // Inicia fade out
        setTimeout(() => {
            element.innerHTML = '';
            element.classList.remove('message-hide');
        }, 1000);
    }, 2000);
}

// ================================
// GEOLOCATION API
// ================================
document.getElementById('getLocation').addEventListener('click', () => {
    const result = document.getElementById('locationResult');
    
    if ('geolocation' in navigator) {
        showMessage(result, '<p>Obteniendo ubicación...</p>');
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(4);
                const lon = position.coords.longitude.toFixed(4);
                const acc = position.coords.accuracy.toFixed(0);
                showMessage(result, `
                    <p><strong>Latitud:</strong> ${lat}</p>
                    <p><strong>Longitud:</strong> ${lon}</p>
                    <p><strong>Precisión:</strong> ${acc} metros</p>
                `);
            },
            (error) => {
                showMessage(result, `<p style="color:#e74c3c;">Error: ${error.message}</p>`);
            }
        );
    } else {
        showMessage(result, '<p>Geolocation no soportado</p>');
    }
});

// ================================
// LOCALSTORAGE API
// ================================
const storageInput = document.getElementById('storageInput');
const storageResult = document.getElementById('storageResult');

document.getElementById('saveStorage').addEventListener('click', () => {
    const value = storageInput.value;
    if (value) {
        localStorage.setItem('userInput', value);
        localStorage.setItem('timestamp', new Date().toLocaleString());
        showMessage(storageResult, '<p style="color: #27ae60;">✓ Guardado exitosamente</p>');
    }
});

document.getElementById('loadStorage').addEventListener('click', () => {
    const saved = localStorage.getItem('userInput');
    const timestamp = localStorage.getItem('timestamp');
    
    if (saved) {
        storageInput.value = saved;
        showMessage(storageResult, `<p><strong>Último guardado:</strong> ${timestamp}</p>`);
    } else {
        showMessage(storageResult, '<p>No hay datos guardados</p>');
    }
});

document.getElementById('clearStorage').addEventListener('click', () => {
    localStorage.removeItem('userInput');
    localStorage.removeItem('timestamp');
    storageInput.value = '';
    showMessage(storageResult, '<p>LocalStorage limpiado</p>');
});

// ================================
// FETCH API
// ================================
document.getElementById('fetchData').addEventListener('click', async () => {
    const result = document.getElementById('fetchResult');
    showMessage(result, '<p>Cargando datos...</p>');
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data = await response.json();
        
        showMessage(result, `
            <p><strong>Nombre:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Ciudad:</strong> ${data.address.city}</p>
            <p><strong>Empresa:</strong> ${data.company.name}</p>
        `);
    } catch (error) {
        showMessage(result, `<p style="color: #e74c3c;">Error: ${error.message}</p>`);
    }
});

// ================================
// CANVAS API
// ================================
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

document.getElementById('drawRect').addEventListener('click', () => {
    const x = Math.random() * (canvas.width - 100);
    const y = Math.random() * (canvas.height - 100);
    const width = 50 + Math.random() * 50;
    const height = 50 + Math.random() * 50;
    
    ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
    ctx.fillRect(x, y, width, height);
});

document.getElementById('drawCircle').addEventListener('click', () => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = 20 + Math.random() * 30;
    
    ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
});

document.getElementById('clearCanvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// ================================
// DRAG & DROP API
// ================================
const draggables = document.querySelectorAll('.draggable');
const zones = document.querySelectorAll('.zone');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => draggable.classList.add('dragging'));
    draggable.addEventListener('dragend', () => draggable.classList.remove('dragging'));
});

zones.forEach(zone => {
    zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.classList.add('dragover');
    });
    
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    
    zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('dragover');
        const dragging = document.querySelector('.dragging');
        if (dragging) zone.appendChild(dragging);
    });
});

// ================================
// NOTIFICATION API
// ================================
const requestBtn = document.getElementById('requestNotification');
const showBtn = document.getElementById('showNotification');
const notifResult = document.getElementById('notificationResult');

requestBtn.addEventListener('click', async () => {
    if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            showBtn.disabled = false;
            showMessage(notifResult, '<p style="color: #27ae60;">✓ Permiso concedido</p>');
        } else {
            showMessage(notifResult, '<p style="color: #e74c3c;">Permiso denegado</p>');
        }
    } else {
        showMessage(notifResult, '<p>Notifications no soportadas</p>');
    }
});

showBtn.addEventListener('click', () => {
    new Notification('¡Hola desde HTML5!', {
        body: 'Esta es una notificación de prueba',
        icon: 'https://cdn-icons-png.flaticon.com/512/561/561127.png'
    });
});

// ================================
// CARGAR LOCALSTORAGE AL INICIO
// ================================
window.addEventListener('load', () => {
    const saved = localStorage.getItem('userInput');
    if (saved) storageInput.value = saved;
});
