const parametros = new URLSearchParams(window.location.search);
const idBuscado = parametros.get("id");
cargarJuego();

async function cargarJuego() {
    const juego = await JuegoManager.obtenerPorId(idBuscado);

    if (juego) {
        mostrarJuego(juego);
        cargarPersonajes();
        cargarZonas();
    }
}

function mostrarJuego(juego) {

    const nombre =juego.getElementsByTagName("nombre")[0].textContent;
    document.title = `Sonic Wiki - ${nombre}`;
    document.getElementById("nombre").textContent = nombre;
    document.getElementById("anio").textContent = juego.getElementsByTagName("anio")[0].textContent;
    document.getElementById("tipo").textContent = juego.getElementsByTagName("tipo")[0].textContent;
    document.getElementById("era").textContent = juego.getElementsByTagName("era")[0].textContent;
    document.getElementById("plataforma").textContent = juego.getElementsByTagName("plataforma")[0].textContent;
    document.getElementById("descripcion").textContent = juego.getElementsByTagName("descripcion")[0].textContent;
    document.getElementById("imagen").src = juego.getElementsByTagName("imagen")[0].textContent;
}

async function cargarPersonajes() {
    const personajes = await JuegoManager.obtenerPersonajes(idBuscado);
    const lista = document.getElementById("listaPersonajes");
    lista.innerHTML = "";

    personajes.forEach(personaje => {
        const li = document.createElement("li");
        li.textContent = personaje.getElementsByTagName("nombre")[0].textContent;
        lista.appendChild(li);
    });
}

async function cargarZonas() {
    const zonas = await JuegoManager.obtenerZonas(idBuscado);
    const lista = document.getElementById("listaZonas");
    lista.innerHTML = "";

    zonas.forEach(zona => {
        const li = document.createElement("li");
        li.textContent = zona.getElementsByTagName("nombre")[0].textContent;
        lista.appendChild(li);
    });
} 