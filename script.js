// -------------------------
// BASE DE DATOS TEMPORAL
// -------------------------
let usuarios = [];

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

    // Cargar usuarios guardados
    usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si ya existe el usuario
    const existe = usuarios.find(u => u.correo === correo);
    if (existe) {
        alert("El correo ya está registrado.");
        return;
    }

    // Guardar usuario nuevo
    const nuevoUsuario = {
        nombres,
        apellidos,
        dni,
        correo,
        telefono,
        password
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso");
}

// -------------------------
// INICIAR SESIÓN
// -------------------------
function iniciarSesion() {
    // Revisar si ya hay sesión activa en sessionStorage
    if (sessionStorage.getItem("usuarioLogeado")) {
        alert("La sesión ya está iniciada.");
        return;
    }

    const correo = document.getElementById("login-correo").value.trim();
    const password = document.getElementById("login-password").value.trim();

    // cargar base de datos guardada
    usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(
        u => u.correo === correo && u.password === password
    );

    if (!usuarioEncontrado) {
        alert("Correo o contraseña incorrectos");
        return;
    }
    let donaciones = JSON.parse(localStorage.getItem("donaciones")) || [];

    // Guardar sesión activa en sessionStorage
    sessionStorage.setItem("usuarioLogeado", JSON.stringify(usuarioEncontrado));

    alert("Sesión iniciada correctamente");
    document.getElementById("login-modal").style.display = "none"; // Oculta el login
}

// -------------------------
// CERRAR SESIÓN
// -------------------------
function cerrarSesion() {
    sessionStorage.removeItem("usuarioLogeado"); // Borra sesión activa
    actualizargeader();
    window.location.reload(); // Recarga la página para pedir login otra vez
}

// -------------------------
// PROTECCIÓN DE PÁGINA / LOGIN MODAL
// -------------------------
document.addEventListener("DOMContentLoaded", function () {
    const usuario = sessionStorage.getItem("usuarioLogeado");

    if (!usuario) {
        // Si no hay sesión, muestra el login modal
        const modal = document.getElementById("login-modal");
        if(modal) modal.style.display = "block";
    } else {
        // Si hay sesión, oculta el login modal
        const modal = document.getElementById("login-modal");
        if(modal) modal.style.display = "none";
    }
});

// -------------------------
// Efectos Fade-in
// -------------------------
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.3, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver(function(entries, observer){
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.style.opacity = 1;
    entry.target.style.transform = "translateY(0px)";
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// -------------------------
// Partículas interactivas
// -------------------------
const canvas = document.getElementById('hero-particles');
if(canvas){
    const ctx = canvas.getContext('3d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const colors = ['rgba(255, 22, 10, 0.05)', 'rgba(1, 98, 233, 0.05)'];

    class Particle {
        constructor(){
            this.x = Math.random()*canvas.width;
            this.y = Math.random()*canvas.height;
            this.size = Math.random()*2 + 1;
            this.speedX = Math.random()*0.5 - 0.25;
            this.speedY = Math.random()*0.5 - 0.25;
            this.color = colors[Math.floor(Math.random()*colors.length)];
        }
        update(){
            this.x += this.speedX;
            this.y += this.speedY;
            if(this.x <0 || this.x>canvas.width) this.speedX *= -1;
            if(this.y <0 || this.y>canvas.height) this.speedY *= -1;
        }
        draw(){
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
            ctx.fill();
        }
    }

    function init(){
        particlesArray = [];
        for(let i=0; i<100; i++){
            particlesArray.push(new Particle());
        }
    }
    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particlesArray.forEach(p => {p.update(); p.draw();});
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize',()=>{
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
}
