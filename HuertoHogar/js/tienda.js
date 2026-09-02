
// Función para agregar producto al carrito
function agregarAlCarrito(nombre, precio) {

    // Obtener carrito actual o crear uno nuevo
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Buscar si el producto ya está en el carrito
    let productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente) {
        // Si ya existe, aumentar cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si no existe, agregar nuevo
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
    }

    // Guardar carrito actualizado
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(nombre + " agregado al carrito.");
}

// --- Carrito de compras ---
function agregarAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(nombre + " agregado al carrito.");
}

// --- Reseñas y calificaciones ---
function dejarResena(nombreProducto) {
    const comentario = prompt("Escribe tu reseña para " + nombreProducto + ":");
    const calificacion = parseInt(prompt("Califica de 1 a 5 estrellas:"));

    if (!comentario || isNaN(calificacion) || calificacion < 1 || calificacion > 5) {
        alert("Reseña inválida. Intenta nuevamente.");
        return;
    }

    let reseñas = JSON.parse(localStorage.getItem("reseñas")) || {};
    if (!reseñas[nombreProducto]) {
        reseñas[nombreProducto] = [];
    }

    reseñas[nombreProducto].push({
        usuario: localStorage.getItem("usuarioActivo") || "Anónimo",
        comentario: comentario,
        calificacion: calificacion
    });

    localStorage.setItem("reseñas", JSON.stringify(reseñas));
    alert("¡Gracias por tu reseña!");
    mostrarResenas(nombreProducto);
}

function mostrarResenas(nombreProducto) {
    let reseñas = JSON.parse(localStorage.getItem("reseñas")) || {};
    let contenedor = document.getElementById("resenas-" + nombreProducto);

    if (!reseñas[nombreProducto] || reseñas[nombreProducto].length === 0) {
        contenedor.innerHTML = "<p>Aún no hay reseñas.</p>";
        return;
    }

    let html = "<h4>Reseñas:</h4>";
    let suma = 0;

    reseñas[nombreProducto].forEach(r => {
        suma += r.calificacion;
        html += `<p><strong>${r.usuario}:</strong> ${r.comentario} (${r.calificacion} estrellas)</p>`;
    });

    let promedio = (suma / reseñas[nombreProducto].length).toFixed(1);
    html += `<p><em>Calificación promedio: ${promedio} estrellas</em></p>`;

    contenedor.innerHTML = html;
}

// --- Búsqueda avanzada de productos ---
function buscarProducto() {
    const texto = document.getElementById("campo-busqueda").value.toLowerCase();

    // Seleccionamos todos los productos
    const productos = document.querySelectorAll(".producto");

    productos.forEach(producto => {
        // Tomamos el texto del producto
        const contenido = producto.innerText.toLowerCase();

        // Si coincide con lo buscado, se muestra; si no, se oculta
        if (contenido.includes(texto)) {
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }
    });
}








