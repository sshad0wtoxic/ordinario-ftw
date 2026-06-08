let listaZonas = [];
cargarZonas();

document.getElementById("buscador").addEventListener("input", function () {
        const texto = this.value.toLowerCase();
        const resultado = listaZonas.filter(z => z.nombre.toLowerCase().includes(texto));
        mostrarZonas(resultado);
    });

async function cargarZonas() {
    const zonas = await ZonaManager.obtenerTodos();

    for (let i = 0; i < zonas.length; i++) {
        const zona = zonas[i];
        listaZonas.push({
        id: zona.getAttribute("id"),

        nombre:
            zona.getElementsByTagName("nombre")[0]
            .textContent,

        tipo:
            zona.getElementsByTagName("tipo")[0]
            .textContent,

        imagen:
            zona.getElementsByTagName("imagen")[0]
            .textContent
    });
    }

    mostrarZonas(listaZonas);
}

function mostrarZonas(zonas) {
    const contenedor = document.getElementById("contenedorZonas");
    contenedor.innerHTML = "";

    zonas.forEach(zona => {
        const card = document.createElement("div");
        card.innerHTML = `

        <h3>${zona.nombre}</h3>

        <div>
            <img
                src="${zona.imagen}"
                width="150"
            >
        </div>

        <p>${zona.tipo}</p>

            <button onclick="verDetalle('${zona.id}')">
                Ver detalles
            </button>

        </button>

        <hr>
    `;

        contenedor.appendChild(card);
    });
}

function verDetalle(id) {

    window.location.href = `detalleZona.html?id=${id}`;
}