let listaPersonajes = [];

/* ==========================
    CARGAR XML DE PERSONAJES
========================== */

fetch("xml/personajes.xml").then(response => response.text()).then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/xml");
        const personajes = xml.getElementsByTagName("personaje");

        for (let i = 0; i < personajes.length; i++) {
            const personaje = personajes[i];

            listaPersonajes.push({

                id: personaje.getAttribute("id"),
                nombre: personaje.getElementsByTagName("nombre")[0].textContent,
                alineacion: personaje.getElementsByTagName("alineacion")[0].textContent,
                imagen: personaje.getElementsByTagName("imagen")[0].textContent
            });
        }

        document.getElementById("contador").textContent = `Total de personajes: ${listaPersonajes.length}`;
        mostrarPersonajes(listaPersonajes);
    }).catch(error => {
        console.error("Error al cargar personajes:", error);
    });

/* ==========================
    MOSTRAR PERSONAJES
========================== */

function mostrarPersonajes(personajes) {

    const contenedor = document.getElementById("contenedorPersonajes");
    contenedor.innerHTML = "";

    personajes.forEach(personaje => {

        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${personaje.imagen}" width="120">

            <h3>${personaje.nombre}</h3>

            <p>${personaje.alineacion}</p>
            <br>

            <button onclick="verDetalle('${personaje.id}')">
                Ver detalles
            </button>
        `;

        contenedor.appendChild(card);
    });
}

/* ==========================
    BUSCADOR
========================== */

document.getElementById("buscador").addEventListener("input", function () {

        const texto = this.value.toLowerCase();
        const resultado = listaPersonajes.filter(p => p.nombre.toLowerCase().includes(texto));
        mostrarPersonajes(resultado);
    });

/* ==========================
    FILTROS
========================== */

function filtrar(tipo) {

    if (tipo === "Todos") {
        mostrarPersonajes(listaPersonajes);
        return;
    }

    const resultado =
        listaPersonajes.filter(
            p => p.alineacion === tipo
        );

    mostrarPersonajes(resultado);
}

/* ==========================
    DETALLE PERSONAJE
========================== */

function verDetalle(id) {
    window.location.href = `detallePersonaje.html?id=${id}`;
}