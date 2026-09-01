// --- Mapa de sucursales con Google Maps ---
const mapa = document.getElementById("mapa-tiendas");

// Lista de sucursales con sus enlaces a Google Maps
const sucursales = [
    { nombre: "Santiago", url: "https://www.google.com/maps?q=Santiago,+Chile" },
    { nombre: "Puerto Montt", url: "https://www.google.com/maps?q=Puerto+Montt,+Chile" },
    { nombre: "Villarica", url: "https://www.google.com/maps?q=Villarica,+Chile" },
    { nombre: "Nacimiento", url: "https://www.google.com/maps?q=Nacimiento,+Chile" },
    { nombre: "Viña del Mar", url: "https://www.google.com/maps?q=Viña+del+Mar,+Chile" },
    { nombre: "Valparaíso", url: "https://www.google.com/maps?q=Valparaíso,+Chile" },
    { nombre: "Concepción", url: "https://www.google.com/maps?q=Concepción,+Chile" }
];

// Mostrar sucursales como lista con enlaces
function mostrarMapa() {
    let html = "<h3>Sucursales disponibles:</h3><ul>";
    sucursales.forEach(ciudad => {
        html += `<li><button onclick="abrirMapa('${ciudad.url}')">📍 ${ciudad.nombre}</button></li>`;
    });
    html += "</ul>";
    mapa.innerHTML = html;
}

// Función para abrir Google Maps en nueva pestaña
function abrirMapa(url) {
    window.open(url, "_blank");
}

// Ejecutar al cargar la página
mostrarMapa();
