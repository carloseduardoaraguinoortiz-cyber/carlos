const timeEl = document.getElementById("time");
const periodEl = document.getElementById("period");
const dateEl = document.getElementById("date");
const greetingEl = document.getElementById("greeting");
const formatBtn = document.getElementById("formatBtn");
const themeBtn = document.getElementById("themeBtn");
const tzSelect = document.getElementById("timezoneSelect");
const tzLabel = document.getElementById("timezone");

const dayOfYearEl = document.getElementById("dayOfYear");
const weekNumberEl = document.getElementById("weekNumber");
const secondsTodayEl = document.getElementById("secondsToday");

let is24h = false;
let currentTZ = "local";

const themes = [
    ["#667eea", "#764ba2"],
    ["#11998e", "#38ef7d"],
    ["#fc466b", "#3f5efb"],
    ["#ff8008", "#ffc837"]
];

let themeIndex = 0;

function getDateByTimezone() {
    if (currentTZ === "local") return new Date();
    return new Date(
        new Date().toLocaleString("en-US", { timeZone: currentTZ })
    );
}

function updateClock() {
    const now = getDateByTimezone();

    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const period = hours >= 12 ? "PM" : "AM";

    if (!is24h) {
        hours = hours % 12 || 12;
        periodEl.style.display = "block";
        periodEl.textContent = period;
    } else {
        periodEl.style.display = "none";
    }

    timeEl.textContent =
        `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

    dateEl.textContent = now.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    greetingEl.textContent =
        now.getHours() < 12 ? "☀️ Buenos días" :
        now.getHours() < 19 ? "🌤️ Buenas tardes" :
        "🌙 Buenas noches";

    updateStats(now);
}

function updateStats(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    dayOfYearEl.textContent = Math.floor((date - start) / 86400000);

    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const week = Math.ceil((((d - new Date(Date.UTC(d.getUTCFullYear(),0,1))) / 86400000)+1)/7);
    weekNumberEl.textContent = week;

    secondsTodayEl.textContent =
        date.getHours()*3600 + date.getMinutes()*60 + date.getSeconds();
}

formatBtn.onclick = () => {
    is24h = !is24h;
    formatBtn.textContent = is24h ? "Cambiar a 12h" : "Cambiar a 24h";
    updateClock(); // 👈 CLAVE
};

themeBtn.onclick = () => {
    themeIndex = (themeIndex + 1) % themes.length;
    document.documentElement.style.setProperty("--primary", themes[themeIndex][0]);
    document.documentElement.style.setProperty("--secondary", themes[themeIndex][1]);
};

tzSelect.onchange = () => {
    currentTZ = tzSelect.value;
    tzLabel.textContent = currentTZ === "local" ? "Hora local" : currentTZ;
    updateClock(); // 👈 actualización inmediata
};

setInterval(updateClock, 1000);
updateClock();
