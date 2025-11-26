// =========================
// ACTUALIZAR HEADER SEGÚN SESIÓN
// =========================
function actualizarHeader() {
    const usuario = localStorage.getItem("usuarioLogeado");
    const btnLogin = document.getElementById("btn-login");
    const btnRegistrarse = document.getElementById("btn-registrarse");
    const btnCerrar = document.getElementById("btn-cerrar-sesion");

    if (btnLogin && btnRegistrarse && btnCerrar) {
        if (usuario === "si") {
            btnLogin.style.display = "none";
            btnRegistrarse.style.display = "none";
            btnCerrar.style.display = "inline-block";
        } else {
            btnLogin.style.display = "inline-block";
            btnRegistrarse.style.display = "inline-block";
            btnCerrar.style.display = "none";
        }
    }
}

// =========================
// FUNCIÓN CERRAR SESIÓN
// =========================
function cerrarSesion() {
    localStorage.removeItem("usuarioLogeado"); // elimina sesión
    actualizarHeader(); // Actualiza botones
    window.location.href = "login.html"; // Redirige
}

// =========================
// CARGA AL INICIO
// =========================
document.addEventListener("DOMContentLoaded", function() {
    actualizarHeader();

    const btnCerrar = document.getElementById("btn-cerrar-sesion");
    if (btnCerrar) {
        btnCerrar.addEventListener("click", cerrarSesion);
    }
});
<script src="auth.js"></script>
