// --- Control de menú según sesión ---
const usuarioActivo = localStorage.getItem("usuarioActivo");

const btnRegistro = document.getElementById("btnRegistro");
const btnLogin = document.getElementById("btnLogin");
const btnPerfil = document.getElementById("btnPerfil");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");

if (usuarioActivo) {
    // Usuario logueado → ocultar registro/login y mostrar perfil/cerrar sesión
    if (btnRegistro) btnRegistro.style.display = "none";
    if (btnLogin) btnLogin.style.display = "none";
    if (btnPerfil) btnPerfil.style.display = "inline-block";
    if (btnCerrarSesion) btnCerrarSesion.style.display = "inline-block";
} else {
    // Usuario no logueado → mostrar registro/login y ocultar perfil/cerrar sesión
    if (btnRegistro) btnRegistro.style.display = "inline-block";
    if (btnLogin) btnLogin.style.display = "inline-block";
    if (btnPerfil) btnPerfil.style.display = "none";
    if (btnCerrarSesion) btnCerrarSesion.style.display = "none";
}

// Función para cerrar sesión
if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", function(event) {
        event.preventDefault();
        localStorage.removeItem("usuarioActivo");
        alert("Has cerrado sesión.");
        window.location.href = "index.html";
    });
}
