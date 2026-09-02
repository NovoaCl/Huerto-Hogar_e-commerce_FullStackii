// --- Mostrar carrito ---
const carritoContenido = document.getElementById("carrito-contenido");
const subtotalSpan = document.getElementById("subtotal");
const envioSpan = document.getElementById("envio");
const totalSpan = document.getElementById("total");

// Cargar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para mostrar carrito
function mostrarCarrito() {
    if (carrito.length === 0) {
        carritoContenido.innerHTML = "<p>Tu carrito está vacío.</p>";
        subtotalSpan.textContent = "$0 CLP";
        envioSpan.textContent = "$0 CLP";
        totalSpan.textContent = "$0 CLP";
        return;
    }

    let html = "";
    let subtotal = 0;

    carrito.forEach((producto, index) => {
        subtotal += producto.precio * producto.cantidad;
        html += `
            <div class="item-carrito">
                <div class="info-producto">
                    <span class="nombre-producto">${producto.nombre}</span>
                    <span class="precio-producto">$${producto.precio} CLP × ${producto.cantidad}</span>
                </div>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            </div>
        `;
    });

    carritoContenido.innerHTML = html;

    // Calcular totales
    let envio = 2000; // costo fijo de envío
    let total = subtotal + envio;

    subtotalSpan.textContent = "$" + subtotal + " CLP";
    envioSpan.textContent = "$" + envio + " CLP";
    totalSpan.textContent = "$" + total + " CLP";

    // Conectar botones eliminar
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", () => {
            const indice = boton.getAttribute("data-index");
            eliminarProducto(indice);
        });
    });
}

// Función para eliminar producto
function eliminarProducto(indice) {
    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// --- Confirmar pedido y guardar en historial ---
const btnConfirmar = document.querySelector("#resumen-carrito button");

if (btnConfirmar) {
    btnConfirmar.addEventListener("click", function() {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        const pedido = {
            fecha: new Date().toLocaleString(),
            productos: carrito,
            subtotal: subtotalSpan.textContent,
            envio: envioSpan.textContent,
            total: totalSpan.textContent,
            estado: "Preparando"
        };

        let historial = JSON.parse(localStorage.getItem("historialPedidos")) || [];
        historial.push(pedido);
        localStorage.setItem("historialPedidos", JSON.stringify(historial));

        // Vaciar carrito
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();

        alert("Pedido confirmado. Se ha guardado en tu historial.");
    });
}

// Mostrar carrito al cargar la página
mostrarCarrito();
