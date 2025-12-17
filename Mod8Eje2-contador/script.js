// ===== SELECCIÓN DE ELEMENTOS =====
const contadorElement = document.getElementById("contador");
const btnIncrementar = document.getElementById("btnIncrementar");
const btnDecrementar = document.getElementById("btnDecrementar");
const btnResetear = document.getElementById("btnResetear");
const btnIncrementar5 = document.getElementById("btnIncrementar5");
const btnDecrementar5 = document.getElementById("btnDecrementar5");

// NUEVOS BOTONES
const btnIncrementar2 = document.getElementById("btnIncrementar2");
const btnDecrementar2 = document.getElementById("btnDecrementar2");
const btnIncrementar10 = document.getElementById("btnIncrementar10");
const btnDecrementar10 = document.getElementById("btnDecrementar10");

const mensajeElement = document.getElementById("mensaje");
const displayContador = document.querySelector(".contador-display");

// ===== VARIABLE DEL CONTADOR =====
let contador = parseInt(localStorage.getItem("contador")) || 0;

// ===== FUNCIONES =====
function actualizarDisplay() {
  contadorElement.textContent = contador;

  // Remover clases previas
  contadorElement.classList.remove("positivo", "negativo", "neutro");
  displayContador.classList.remove("bg-positivo", "bg-negativo", "bg-neutro");

  // Aplicar colores según valor
  if (contador > 0) {
    contadorElement.classList.add("positivo");
    displayContador.classList.add("bg-positivo");
    actualizarMensaje("positivo");
  } else if (contador < 0) {
    contadorElement.classList.add("negativo");
    displayContador.classList.add("bg-negativo");
    actualizarMensaje("negativo");
  } else {
    contadorElement.classList.add("neutro");
    displayContador.classList.add("bg-neutro");
    actualizarMensaje("neutro");
  }

  // Guardar en LocalStorage
  localStorage.setItem("contador", contador);
}

function actualizarMensaje(estado) {
  let mensaje = "";
  switch (estado) {
    case "positivo":
      mensaje = `El contador está en <strong>positivo</strong> (+${contador})`;
      break;
    case "negativo":
      mensaje = `El contador está en <strong>negativo</strong> (${contador})`;
      break;
    case "neutro":
      mensaje = "El contador está en <strong>cero</strong>";
      break;
  }
  mensajeElement.innerHTML = mensaje;
}

function incrementar(cantidad = 1) {
  contador += cantidad;
  actualizarDisplay();
}

function decrementar(cantidad = 1) {
  contador -= cantidad;
  actualizarDisplay();
}

function resetear() {
  contador = 0;
  actualizarDisplay();
}

// ===== EVENT LISTENERS =====
btnIncrementar.addEventListener("click", () => incrementar(1));
btnDecrementar.addEventListener("click", () => decrementar(1));
btnResetear.addEventListener("click", resetear);
btnIncrementar5.addEventListener("click", () => incrementar(5));
btnDecrementar5.addEventListener("click", () => decrementar(5));

// NUEVOS BOTONES +2, -2, +10, -10
btnIncrementar2.addEventListener("click", () => incrementar(2));
btnDecrementar2.addEventListener("click", () => decrementar(2));
btnIncrementar10.addEventListener("click", () => incrementar(10));
btnDecrementar10.addEventListener("click", () => decrementar(10));

// BONUS: Atajos de teclado
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp": incrementar(1); break;
    case "ArrowDown": decrementar(1); break;
    case "r":
    case "R": resetear(); break;
    case "+": incrementar(5); break;
    case "-": decrementar(5); break;
    case "2": incrementar(2); break;
    case "8": decrementar(2); break;
    case "0": incrementar(10); break;
    case "9": decrementar(10); break;
  }
});

// ===== INICIALIZACIÓN =====
actualizarDisplay();
console.log("🎮 Contador Interactivo iniciado con botones +2, -2, +10, -10");
