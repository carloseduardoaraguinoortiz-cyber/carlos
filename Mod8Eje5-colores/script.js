const body = document.body;
const colorCode = document.getElementById('colorCode');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const historyGrid = document.getElementById('historyGrid');
const clearHistoryBtn = document.getElementById('clearHistory');
const rgbValue = document.getElementById('rgbValue');
const hslValue = document.getElementById('hslValue');
const toast = document.getElementById('toast');

let colorHistory = JSON.parse(localStorage.getItem('colorHistory')) || [];

function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
}

function hexToRgb(hex) {
    const r = parseInt(hex.substr(1,2),16);
    const g = parseInt(hex.substr(3,2),16);
    const b = parseInt(hex.substr(5,2),16);
    return `rgb(${r}, ${g}, ${b})`;
}

function hexToHsl(hex) {
    let r = parseInt(hex.substr(1,2),16)/255;
    let g = parseInt(hex.substr(3,2),16)/255;
    let b = parseInt(hex.substr(5,2),16)/255;

    let max = Math.max(r,g,b), min = Math.min(r,g,b);
    let h, s, l = (max + min) / 2;

    if(max === min){
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return `hsl(${Math.round(h*360)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`;
}

function applyColor(color) {
    body.style.backgroundColor = color;
    colorCode.textContent = color;
    rgbValue.textContent = hexToRgb(color);
    hslValue.textContent = hexToHsl(color);

    if (colorHistory[0] !== color) {
        colorHistory.unshift(color);
        colorHistory = colorHistory.slice(0, 12);
        localStorage.setItem('colorHistory', JSON.stringify(colorHistory));
        renderHistory();
    }
}

function renderHistory() {
    historyGrid.innerHTML = '';
    colorHistory.forEach(color => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.style.background = color;
        div.textContent = color;
        div.onclick = () => applyColor(color);
        historyGrid.appendChild(div);
    });
}

copyBtn.onclick = async () => {
    await navigator.clipboard.writeText(colorCode.textContent);
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1500);
};

generateBtn.onclick = () => applyColor(randomColor());

clearHistoryBtn.onclick = () => {
    localStorage.removeItem('colorHistory');
    colorHistory = [];
    renderHistory();
};

document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        e.preventDefault();
        applyColor(randomColor());
    }
});

const initial = colorHistory[0] || '#667EEA';
applyColor(initial);
renderHistory();
