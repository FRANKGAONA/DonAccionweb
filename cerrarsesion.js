// Actualiza el header según sesión
function actualizarHeader(){
  const usuario = localStorage.getItem("usuarioLogeado");
  const btnLogin = document.getElementById("btn-login");
  const btnRegistrarse = document.getElementById("btn-registrarse");
  const btnCerrar = document.getElementById("btn-cerrar-sesion");

  if(btnLogin && btnRegistrarse && btnCerrar){
    if(usuario === "si"){
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

// Cerrar sesión
function cerrarSesion(){
  localStorage.removeItem("usuarioLogeado");
  actualizarHeader();
  window.location.href = "login.html";
}

// Cargar al inicio
document.addEventListener("DOMContentLoaded", ()=>{
  actualizarHeader();
  const btnCerrar = document.getElementById("btn-cerrar-sesion");
  if(btnCerrar) btnCerrar.addEventListener("click", cerrarSesion);
});
