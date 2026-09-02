
// Seleccionamos el formulario
const formularioLogin = document.getElementById("formulario-login");

// enviar formulario
formularioLogin.addEventListener("submit", function(event) {
    event.preventDefault(); // evita recargar la página

    // Obtenemos los valores ingresados
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validar que no estén vacíos
    if (!email || !password) {
        alert("Por favor ingresa tu correo y contraseña.");
        return;
    }

    // Buscar usuario en localStorage
    const usuarioGuardado = localStorage.getItem(email);

    if (!usuarioGuardado) {
        alert("Usuario no registrado.");
        return;
    }

    // Convertimos el texto guardado a objeto
    const usuario = JSON.parse(usuarioGuardado);

    // Validar contraseña
    if (usuario.password !== password) {
        alert("Contraseña incorrecta.");
        return;
    }

    // Guardamos usuario activo
    localStorage.setItem("usuarioActivo", email);

    // Mensaje de éxito
    alert("¡Bienvenido " + usuario.nombre + "!");

    // Redirigir al perfil
    window.location.href = "perfil.html";
});
