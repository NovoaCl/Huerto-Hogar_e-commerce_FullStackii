// Seleccionamos el formulario
const formularioPerfil = document.getElementById("formulario-perfil");

// Obtenemos el usuario activo desde localStorage
const usuarioActivoEmail = localStorage.getItem("usuarioActivo");

// Si hay un usuario activo, cargamos sus datos
if (usuarioActivoEmail) {
    const usuarioGuardado = localStorage.getItem(usuarioActivoEmail);

    if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);

        // Mostrar los datos en los campos del formulario
        document.getElementById("nombre").value = usuario.nombre;
        document.getElementById("email").value = usuario.email;
        document.getElementById("telefono").value = usuario.telefono;
        document.getElementById("direccion").value = usuario.direccion;
    }
}

// Escuchamos el evento de guardar cambios
formularioPerfil.addEventListener("submit", function(event) {
    event.preventDefault(); // evita recargar la página

    // Obtenemos los valores actualizados
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();

    // Validar que no estén vacíos
    if (!nombre || !email || !telefono || !direccion) {
        alert("Por favor completa todos los campos.");
        return;
    }

    // Actualizamos el objeto usuario
    const usuarioActualizado = {
        nombre: nombre,
        email: email,
        password: JSON.parse(localStorage.getItem(usuarioActivoEmail)).password, // mantenemos la contraseña
        telefono: telefono,
        direccion: direccion
    };

    // Guardamos los cambios en localStorage
    localStorage.setItem(email, JSON.stringify(usuarioActualizado));
    localStorage.setItem("usuarioActivo", email);

    alert("Información actualizada correctamente.");
});

// --- Historial de compras ---
const tablaHistorial = document.querySelector("#tabla-historial tbody");

function mostrarHistorial() {
    let historial = JSON.parse(localStorage.getItem("historialPedidos")) || [];

    if (historial.length === 0) {
        tablaHistorial.innerHTML = "<tr><td colspan='5'>Aún no hay compras registradas.</td></tr>";
        return;
    }

    let html = "";
    historial.forEach((pedido, index) => {
        // Resumen de productos (todos los productos del pedido)
        let productosResumen = pedido.productos.map(p => `${p.nombre} x${p.cantidad}`).join(", ");

        html += `
            <tr>
                <td>Pedido ${index + 1}</td>
                <td>${pedido.fecha}</td>
                <td>${productosResumen}</td>
                <td>${pedido.total}</td>
                <td>${pedido.estado}</td>
            </tr>
        `;
    });

    tablaHistorial.innerHTML = html;
}

// Actualizar historial cada 3 segundos para reflejar cambios de estado
setInterval(mostrarHistorial, 3000);

// Mostrar historial al cargar perfil
mostrarHistorial();



