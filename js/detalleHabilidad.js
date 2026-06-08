const parametros = new URLSearchParams(window.location.search);
const idBuscado = parametros.get("id");
cargarHabilidad();

async function cargarHabilidad() {
    const habilidad = await HabilidadManager.obtenerPorId(idBuscado);

    if (habilidad) {
        mostrarHabilidad(habilidad);
        cargarPersonajes();
    }
}

function mostrarHabilidad(habilidad) {

    const nombre = habilidad.getElementsByTagName("nombre")[0].textContent;
    document.title = `Sonic Wiki - ${nombre}`;
    document.getElementById("nombre").textContent =nombre;
    document.getElementById("tipo").textContent =habilidad.getElementsByTagName("tipo")[0].textContent;
    document.getElementById("descripcion").textContent =habilidad.getElementsByTagName("descripcion")[0].textContent;
}

async function cargarPersonajes() {
    const personajes = await HabilidadManager.obtenerPersonajes(idBuscado);
    const lista = document.getElementById("listaPersonajes");
    lista.innerHTML = "";

    personajes.forEach(personaje => {
        const li = document.createElement("li");
        li.textContent = personaje.getElementsByTagName("nombre")[0].textContent;
        lista.appendChild(li);
    });
}