const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
const edadInput = document.getElementById('edad');
const btn = document.getElementById('btnCalcular');
const valorIMC = document.getElementById('valorIMC');
const estadoIMC = document.getElementById('estadoIMC');
const edadInfo = document.getElementById('edadInfo');

btn.addEventListener('click', () => {
    const peso = parseFloat(pesoInput.value);
    const alturaCm = parseFloat(alturaInput.value);
    const edad = parseInt(edadInput.value);

    if (!peso || !alturaCm || !edad || peso <= 0 || alturaCm <= 0 || edad <= 0) {
        valorIMC.textContent = '--';
        estadoIMC.textContent = 'Datos inválidos';
        estadoIMC.style.color = '#f87171';
        edadInfo.textContent = '';
        return;
    }

    const alturaM = alturaCm / 100;
    const imc = (peso / (alturaM * alturaM)).toFixed(1);

    valorIMC.textContent = imc;

    let estado = '';
    let color = '';

    if (imc < 18.5) {
        estado = 'Bajo peso';
        color = '#facc15';
    } else if (imc < 25) {
        estado = 'Peso normal';
        color = '#22c55e';
    } else if (imc < 30) {
        estado = 'Sobrepeso';
        color = '#fb923c';
    } else {
        estado = 'Obesidad';
        color = '#ef4444';
    }

    valorIMC.style.color = color;
    estadoIMC.style.color = color;
    estadoIMC.textContent = estado;

    edadInfo.textContent = `Edad registrada: ${edad} años`;
});
