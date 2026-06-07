const parametros =new URLSearchParams(window.location.search);
let personajeActualId = "";
const idBuscado = parametros.get("id");
cargarPersonaje();

async function cargarPersonaje() {
    const personaje = await PersonajeManager.obtenerPorId(idBuscado);

    if (personaje) {
        personajeActualId = personaje.getAttribute("id");
        mostrarPersonaje(personaje);
        cargarJuegos();
        cargarZonas();
        cargarHabilidades();
    }
}

function mostrarPersonaje(personaje) {
    const nombre = personaje.getElementsByTagName("nombre")[0].textContent;
    document.title = `Sonic Wiki - ${nombre}`;
    document.getElementById("nombre").textContent = nombre;
    document.getElementById("alineacion").textContent = personaje.getElementsByTagName("alineacion")[0].textContent;
    document.getElementById("especie").textContent = personaje.getElementsByTagName("especie")[0].textContent;
    document.getElementById("descripcion").textContent = personaje.getElementsByTagName("descripcion")[0].textContent;
    document.getElementById("genero").textContent =personaje.getElementsByTagName("genero")[0].textContent;
    document.getElementById("juegoDebut").textContent = personaje.getElementsByTagName("juegoDebut")[0].textContent;
    document.getElementById("imagen").src = personaje.getElementsByTagName("imagen")[0].textContent;
    document.getElementById("velocidad").value = personaje.getElementsByTagName("velocidad")[0].textContent;
    document.getElementById("fuerza").value = personaje.getElementsByTagName("fuerza")[0].textContent;
    document.getElementById("inteligencia").value = personaje.getElementsByTagName("inteligencia")[0].textContent;
    document.getElementById("valorVelocidad").textContent = personaje.getElementsByTagName("velocidad")[0].textContent;
    document.getElementById("valorFuerza").textContent = personaje.getElementsByTagName("fuerza")[0].textContent;
    document.getElementById("valorInteligencia").textContent = personaje.getElementsByTagName("inteligencia")[0].textContent;
}

async function cargarHabilidades() {

    const habilidades = await HabilidadManager.obtenerHabilidadesDePersonaje(personajeActualId);
    const lista = document.getElementById("listaHabilidades");
    lista.innerHTML = "";

    habilidades.forEach(habilidad => {
            const nombre = habilidad.getElementsByTagName("nombre")[0].textContent;
            const li =document.createElement("li");
            li.textContent = nombre;
            lista.appendChild(li);
        }
    );
}

async function cargarJuegos() {
    const juegos = await JuegoManager.obtenerJuegosDePersonaje(personajeActualId);
    const lista = document.getElementById("listaJuegos");
    lista.innerHTML = "";

    juegos.forEach(juego => {
        const nombre = juego.getElementsByTagName("nombre")[0].textContent;
        const li = document.createElement("li");
        li.textContent = nombre;
        lista.appendChild(li);
    });
}

async function cargarZonas() {
    const zonas = await ZonaManager.obtenerZonasDePersonaje(personajeActualId);
    const lista =document.getElementById("listaZonas");
    lista.innerHTML = "";

    zonas.forEach(zona => {
        const nombre = zona.getElementsByTagName("nombre")[0].textContent;
        const li = document.createElement("li");
        li.textContent = nombre;
        lista.appendChild(li);
    });
}