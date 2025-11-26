console.log("Script cargado correctamente");

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
// CERRAR SESIÓN
// =========================
function cerrarSesion() {
    console.log("Cerrando sesión...");
    localStorage.removeItem("usuarioLogeado");
    actualizarHeader();
    window.location.href = "login.html";
}

// =========================
// VERIFICAR SESIÓN AL ACCEDER A SECCIONES PROTEGIDAS
// =========================
function verificarSesionAntesDeEntrar(event) {
    const usuario = localStorage.getItem("usuarioLogeado");
    if (usuario !== "si") {
        event.preventDefault(); // Detiene el link
        alert("Debes iniciar sesión para acceder.");
        window.location.href = "login.html";
    }
}

// =========================
// EVENTOS
// =========================
document.addEventListener("DOMContentLoaded", function() {
    actualizarHeader();

    const btnCerrar = document.getElementById("btn-cerrar-sesion");
    if (btnCerrar) {
        btnCerrar.addEventListener("click", cerrarSesion);
        console.log("Evento click agregado");
    }

    // Proteger categorías
    const botonesProtegidos = [
        document.getElementById("btn-alimentos"),
        document.getElementById("btn-ropa"),
        document.getElementById("btn-juguetes")
    ];

    botonesProtegidos.forEach(boton => {
        if (boton) {
            boton.addEventListener("click", verificarSesionAntesDeEntrar);
        }
    });
});
