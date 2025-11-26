// Guardar donación en localStorage
let donaciones = JSON.parse(localStorage.getItem("donaciones")) || [];
function guardarDonacion() {
  const usuario = JSON.parse(sessionStorage.getItem('usuarioLogeado')) || null;
  if (!usuario) {
    alert('Debes iniciar sesión para donar.');
    // Si tienes requerirSesion en scope:
    if (typeof requerirSesion === 'function') requerirSesion(window.location.href);
    return;
  }

  // Cambia estos IDs por los que tengas en tu formulario
  const nombre = document.getElementById('donar-nombre') ? document.getElementById('donar-nombre').value.trim() : '';
  const cantidad = document.getElementById('donar-cantidad') ? document.getElementById('donar-cantidad').value.trim() : '';
  const comentario = document.getElementById('donar-comentario') ? document.getElementById('donar-comentario').value.trim() : '';

  if (!nombre || !cantidad) {
    alert('Completa nombre y cantidad.');
    return;
  }

  const donaciones = JSON.parse(localStorage.getItem('donaciones')) || [];

  const nueva = {
    id: Date.now(),
    userEmail: usuario.correo || null,
    userName: usuario.nombres || null,
    categoria: document.body.dataset.categoria || 'general', // opcional, si la página define data-categoria="juguetes"
    nombre,
    cantidad,
    comentario,
    fecha: new Date().toISOString()
  };

  donaciones.push(nueva);
  localStorage.setItem('donaciones', JSON.stringify(donaciones));

  alert('Donación guardada. ¡Gracias!');
  // opcional: reset formulario
  if (document.getElementById('form-donar')) document.getElementById('form-donar').reset();
}