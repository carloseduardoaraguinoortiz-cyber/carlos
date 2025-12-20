const products = [
    {
        id: 1,
        name: "Smart TV 55''",
        price: 21999,
        desc: "4K UHD Android TV",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
        stock: 6
    },
    {
        id: 2,
        name: "Refrigerador Inverter",
        price: 18999,
        desc: "Ahorro energético",
        image: "https://images.unsplash.com/photo-1684055733705-23d5f0661696?q=80&w=696&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stock: 4
    },
    {
        id: 3,
        name: "Lavadora Automática",
        price: 15999,
        desc: "18kg inteligente",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1",
        stock: 5
    },
    {
        id: 4,
        name: "Microondas Digital",
        price: 4299,
        desc: "Panel táctil",
        image: "https://plus.unsplash.com/premium_photo-1726662889654-ce75fbfdd1ab?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stock: 8
    },
    {
        id: 5,
        name: "Aire Acondicionado",
        price: 19999,
        desc: "Inverter frío/calor",
        image: "https://plus.unsplash.com/premium_photo-1679943423706-570c6462f9a4?q=80&w=705&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stock: 3
    },
    {
        id: 6,
        name: "Licuadora Profesional",
        price: 2499,
        desc: "Alta potencia",
        image: "https://plus.unsplash.com/premium_photo-1663050876893-49660f457c93?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        stock: 10
    }
];

let cart = [];

const grid = document.getElementById("productsGrid");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartSummary = document.getElementById("cartSummary");

const subtotalEl = document.getElementById("subtotal");
const taxEl = document.getElementById("tax");
const totalEl = document.getElementById("total");
const orderTotal = document.getElementById("orderTotal");
const modal = document.getElementById("modal");

const IVA = 0.16;
const SHIPPING = 80;

// Render productos
function renderProducts() {
    grid.innerHTML = "";
    products.forEach(p => {
        grid.innerHTML += `
        <div class="card">
            <div class="img-box">
                <img src="${p.image}" alt="${p.name}">
            </div>
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <strong>$${p.price.toLocaleString()}</strong>
            <button onclick="addToCart(${p.id})">Agregar</button>
        </div>
        `;
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);

    if (item) item.qty++;
    else cart.push({ ...product, qty: 1 });

    updateCart();
}

function updateCart() {
    cartCount.textContent = cart.reduce((s, i) => s + i.qty, 0);

    if (!cart.length) {
        cartItems.innerHTML = `<p class="empty">Carrito vacío</p>`;
        cartSummary.style.display = "none";
        return;
    }

    cartSummary.style.display = "block";
    cartItems.innerHTML = "";

    cart.forEach(i => {
        cartItems.innerHTML += `
        <div class="cart-item">
            <img src="${i.image}" alt="">
            <div>
                <strong>${i.name}</strong>
                <small>$${i.price} x ${i.qty}</small>
            </div>
            <button onclick="removeItem(${i.id})">✖</button>
        </div>
        `;
    });

    const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const tax = sub * IVA;
    const total = sub + tax + SHIPPING;

    subtotalEl.textContent = `$${sub.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
}

document.getElementById("checkoutBtn").onclick = () => {
    if (!cart.length) return;
    orderTotal.textContent = totalEl.textContent;
    modal.classList.add("show");
    cart = [];
    updateCart();
};

document.getElementById("clearCartBtn").onclick = () => {
    cart = [];
    updateCart();
};

function closeModal() {
    modal.classList.remove("show");
}

renderProducts();
