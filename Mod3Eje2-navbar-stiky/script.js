// Navbar sticky y boton volver arriba
const navbar = document.getElementById('navbar');
const btnTop = document.getElementById('btnTop');

window.addEventListener('scroll', () => {
  if(window.scrollY > 50) navbar.classList.add('sticky');
  else navbar.classList.remove('sticky');

  if(window.scrollY > 200) btnTop.style.display="flex";
  else btnTop.style.display="none";
});

// Boton volver arriba
btnTop.addEventListener('click', ()=>{ window.scrollTo({top:0, behavior:'smooth'}); });

// Menu hamburguesa responsive
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', ()=>{ navMenu.classList.toggle('active'); });
