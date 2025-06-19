const API_URL = 'https://tubackend.onrender.com/api/mascotas';

async function cargarMascotas() {
  const res = await fetch(API_URL);
  const mascotas = await res.json();
  const lista = document.getElementById('listaMascotas');
  lista.innerHTML = mascotas.map(m => `
    <div>
      <strong>${m.nombre}</strong> - ${m.tipo}, ${m.edad} años - ${m.contacto}
      <button onclick="editar('${m._id}')">Editar</button>
      <button onclick="eliminar('${m._id}')">Eliminar</button>
    </div>`).join('');
}

document.getElementById('formulario').addEventListener('submit', async e => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const tipo = document.getElementById('tipo').value;
  const edad = parseInt(document.getElementById('edad').value);
  const contacto = document.getElementById('contacto').value;
  const id = document.getElementById('idMascota').value;

  const mascota = { nombre, tipo, edad, contacto };

  try {
    if (id) {
      await fetch(`${API_URL}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(mascota) });
    } else {
      await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(mascota) });
    }
    e.target.reset();
    document.getElementById('idMascota').value = '';
    cargarMascotas();
  } catch (err) {
    alert("Error al guardar: " + err.message);
  }
});

async function editar(id) {
  const res = await fetch(`${API_URL}`);
  const mascotas = await res.json();
  const mascota = mascotas.find(m => m._id === id);
  document.getElementById('nombre').value = mascota.nombre;
  document.getElementById('tipo').value = mascota.tipo;
  document.getElementById('edad').value = mascota.edad;
  document.getElementById('contacto').value = mascota.contacto;
  document.getElementById('idMascota').value = mascota._id;
}

async function eliminar(id) {
  if (confirm("¿Eliminar esta mascota?")) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    cargarMascotas();
  }
}

cargarMascotas();