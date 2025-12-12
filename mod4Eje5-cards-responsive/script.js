const buttons = document.querySelectorAll(".filter-btn");
const items = document.querySelectorAll(".item");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        // Activar botón
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        items.forEach(item => {
            item.style.display =
                filter === "all" || item.classList.contains(filter)
                ? "flex"
                : "none";
        });
    });
});
