// MENU HAMBURGUESA
const toggle = document.getElementById("navbarToggle");
const menu = document.getElementById("navbarMenu");

toggle.addEventListener("click", () => {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
});

// EFECTO: ACTIVAR LINKS AL HACER SCROLL
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const top = window.scrollY;
        if (top >= section.offsetTop - 100) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute("href") === `#${current}`) {
            a.classList.add("active");
        }
    });
});
