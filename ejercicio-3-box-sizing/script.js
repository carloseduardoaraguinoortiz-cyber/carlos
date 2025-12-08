const widthSlider = document.getElementById('widthSlider');
const paddingSlider = document.getElementById('paddingSlider');
const borderSlider = document.getElementById('borderSlider');

const widthValue = document.getElementById('widthValue');
const paddingValue = document.getElementById('paddingValue');
const borderValue = document.getElementById('borderValue');

const demoContentBox = document.getElementById('demoContentBox');
const demoBorderBox = document.getElementById('demoBorderBox');

const totalContentBox = document.getElementById('totalContentBox');
const totalBorderBox = document.getElementById('totalBorderBox');

function updateBoxes() {
    const width = widthSlider.value;
    const padding = paddingSlider.value;
    const border = borderSlider.value;

    widthValue.textContent = width + 'px';
    paddingValue.textContent = padding + 'px';
    borderValue.textContent = border + 'px';

    demoContentBox.style.width = width + 'px';
    demoContentBox.style.padding = padding + 'px';
    demoContentBox.style.borderWidth = border + 'px';
    totalContentBox.textContent = `Total: ${parseInt(width)+parseInt(padding)*2+parseInt(border)*2}px`;

    demoBorderBox.style.width = width + 'px';
    demoBorderBox.style.padding = padding + 'px';
    demoBorderBox.style.borderWidth = border + 'px';
    totalBorderBox.textContent = `Total: ${width}px`;
}

widthSlider.addEventListener('input', updateBoxes);
paddingSlider.addEventListener('input', updateBoxes);
borderSlider.addEventListener('input', updateBoxes);

updateBoxes();
