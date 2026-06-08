const parametros =new URLSearchParams(window.location.search);
const idBuscado = parametros.get("id");
cargarZona();

async function cargarZona() {
    const zona = await ZonaManager.obtenerPorId(idBuscado);

    if (zona) {
        mostrarZona(zona);
        cargarPersonajes();
        cargarJuegos();
    }
}
async function mostrarZona(zona) {
    const nombre = zona.getElementsByTagName("nombre")[0].textContent;
    document.title = `Sonic Wiki - ${nombre}`;
    document.getElementById("nombre").textContent = nombre;
    document.getElementById("tipo").textContent = zona.getElementsByTagName("tipo")[0].textContent;
    document.getElementById("alineacion").textContent =zona.getElementsByTagName("alineacion")[0].textContent;
    document.getElementById("descripcion").textContent =zona.getElementsByTagName("descripcion")[0].textContent;
    document.getElementById("imagen").src =zona.getElementsByTagName("imagen")[0].textContent;
    
    const idJuego = zona.getElementsByTagName("primeraAparicion")[0].textContent;
    const juego = await JuegoManager.obtenerPorId(idJuego);
    document.getElementById("primeraAparicion").textContent = juego.getElementsByTagName("nombre")[0].textContent;
}

async function cargarPersonajes() {
    const personajes = await ZonaManager.obtenerPersonajes(idBuscado);
    const lista = document.getElementById("listaPersonajes");
    lista.innerHTML = "";

    personajes.forEach(personaje => {
        const li = document.createElement("li");
        li.textContent = personaje.getElementsByTagName("nombre")[0].textContent;
        lista.appendChild(li);
    });
}

async function cargarJuegos() {
    const juegos = await ZonaManager.obtenerJuegos(idBuscado);
    const lista = document.getElementById("listaJuegos");
    lista.innerHTML = "";

    juegos.forEach(juego => {
        const li = document.createElement("li");
        li.textContent = juego.getElementsByTagName("nombre")[0].textContent;
        lista.appendChild(li);
    });
}