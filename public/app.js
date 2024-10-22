fetch('/api/productos')
  .then(response => response.json())
  .then(data => {
    const contenedor = document.getElementById('productos');
    data.forEach(producto => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h2>${producto.nombre}</h2>
        <p>${producto.descripcion}</p>
        <p>Precio: $${producto.precio}</p>
      `;
      contenedor.appendChild(div);
    });
  })
  .catch(error => console.error('Error:', error));

  // Manejo del formulario de registro
document.getElementById('formRegistro').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = e.target.nombre.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const res = await fetch('/api/usuarios/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password }),
    });
    const data = await res.json();
    alert(data.message);
    window.location.href = 'login.html';
  } catch (error) {
    alert('Error al registrar usuario');
  }
});

// Manejo del formulario de login
document.getElementById('formLogin').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const res = await fetch('/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    alert(data.message);
  } catch (error) {
    alert('Error al iniciar sesión');
  }
});

// Manejo de la imagen logo
const image = document.getElementById('logo');

image.addEventListener('mousemove', (event) => {
    const rect = image.getBoundingClientRect();
    const x = event.clientX - rect.left; // Posición horizontal del mouse dentro de la imagen
    const y = event.clientY - rect.top;  // Posición vertical del mouse dentro de la imagen

    const moveX = (x / rect.width - 0.5) * 20; // Ajuste horizontal para movimiento
    const moveY = (y / rect.height - 0.5) * 20; // Ajuste vertical para movimiento

    image.style.transform = `scale(1.2) translate(${moveX}px, ${moveY}px)`; // Escalar la imagen y moverla
});

image.addEventListener('mouseleave', () => {
    image.style.transform = 'scale(1) translate(0px, 0px)'; // Restaurar al tamaño original
});


