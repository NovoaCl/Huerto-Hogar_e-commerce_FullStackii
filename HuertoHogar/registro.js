
// formulario
const formularioRegistro = document.getElementById("formulario-registro");

// enviar formulario
formularioRegistro.addEventListener("submit", function(event) {
    event.preventDefault(); // evita que la página se recargue

    // Obtenemos valores de campos
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const password2 = document.getElementById("password2").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();

   
    // Revisar que no haya campos vacíos
    if (!nombre || !email || !password || !password2 || !telefono || !direccion) {
        alert("Por favor completa todos los campos.");
        return;
    }

    // Revisar que las contraseñas coincidan
    if (password !== password2) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Revisar que la contraseña tenga entre 5 y 18 caracteres
    if (password.length < 5 || password.length > 18) {
        alert("La contraseña debe tener entre 5 y 18 caracteres.");
        return;
    }

    // --- Guardar usuario en localStorage ---
    // Creamos un objeto con los datos
    const usuario = {
        nombre: nombre,
        email: email,
        password: password,
        telefono: telefono,
        direccion: direccion
    };

    // Guardamos usando el email como clave para que no se repitan
    localStorage.setItem(email, JSON.stringify(usuario));

    // Guardamos también el usuario activo
    localStorage.setItem("usuarioActivo", email);

    // Mensaje de éxito
    alert("Registro exitoso. Ahora puedes iniciar sesión.");

    // Redirigir al login
    window.location.href = "login.html";

    
});
