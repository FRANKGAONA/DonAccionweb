// -------------------------
// BASE DE DATOS TEMPORAL
// -------------------------
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// -------------------------
// REGISTRAR USUARIO
// -------------------------
function registrarUsuario() {
    const nombres = document.getElementById("reg-nombres").value.trim();
    const apellidos = document.getElementById("reg-apellidos").value.trim();
    const dni = document.getElementById("reg-dni").value.trim();
    const correo = document.getElementById("reg-correo").value.trim();
    const telefono = document.getElementById("reg-telefono").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    if (!nombres || !apellidos || !dni || !correo || !telefono || !password) {
        alert("Completa todos los campos");
        return;
    }

    const existe = usuarios.find(u => u.correo === correo);
    if (existe) {
        alert("El correo ya está registrado.");
        return;
    }

    const nuevoUsuario = { nombres, apellidos, dni, correo, telefono, password };
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso");
}

// -------------------------
// INICIAR SESIÓN
// -------------------------
function iniciarSesion() {
    const correo = document.getElementById("login-correo").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!correo || !password) {
        alert("Completa todos los campos");
        return;
    }

    usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(u => u.correo === correo && u.password === password);
    if (!usuarioEncontrado) {
        alert("Correo o contraseña incorrectos");
        return;
    }

    // Guardar sesión en sessionStorage
    sessionStorage.setItem("usuarioLogeado", JSON.stringify(usuarioEncontrado));

    alert("Sesión iniciada correctamente");

    // Ocultar modal y resetear formulario
    const modal = document.getElementById("login-modal");
    if(modal) modal.style.display = "none";
    document.getElementById("login-form").reset();
}

// -------------------------
// CERRAR SESIÓN
// -------------------------
function cerrarSesion() {
    sessionStorage.removeItem("usuarioLogeado");

    // Mostrar login modal nuevamente
    const modal = document.getElementById("login-modal");
    if(modal) modal.style.display = "flex";
}

// -------------------------
// PROTEGER BOTONES Y PÁGINAS
// -------------------------
function requerirSesion(destino) {
    const usuario = sessionStorage.getItem("usuarioLogeado");
    if (!usuario) {
        alert("Debes iniciar sesión para continuar.");
        const modal = document.getElementById("login-modal");
        if(modal) modal.style.display = "flex";
    } else {
        window.location.href = destino;
    }
}

// -------------------------
// MOSTRAR LOGIN SI NO HAY SESIÓN
// -------------------------
document.addEventListener("DOMContentLoaded", function () {
    const usuario = sessionStorage.getItem("usuarioLogeado");
    const modal = document.getElementById("login-modal");

    if (!usuario && modal) {
        modal.style.display = "flex";
    }
});

// -------------------------
// ENVÍO FORMULARIO LOGIN
// -------------------------
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();
    iniciarSesion();
});
  <script src="cerrarSesion.js"></script>