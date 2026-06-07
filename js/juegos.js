let listaJuegos = [];
cargarJuegos();

async function cargarJuegos() {
    const juegos = await JuegoManager.obtenerTodos();

    for (let i = 0;i < juegos.length;i++) {
        const juego = juegos[i];

        listaJuegos.push({
            id:juego.getAttribute("id"),
            nombre:juego.getElementsByTagName("nombre")[0].textContent,
            anio:juego.getElementsByTagName("anio")[0].textContent,
            imagen: juego.getElementsByTagName("imagen")[0].textContent
        });
    }

    document.getElementById("contador").textContent = `Total de juegos: ${listaJuegos.length}`;

    mostrarJuegos(listaJuegos);
}

function mostrarJuegos(juegos) {
    const contenedor = document.getElementById("contenedorJuegos");
    contenedor.innerHTML = "";

    juegos.forEach(juego => {
        const card =document.createElement("div");
        card.innerHTML = `
            <h3>${juego.nombre}</h3>

            <div>
                <img src="${juego.imagen}" alt="${juego.nombre}" width="150">
            </div>

            <p>${juego.anio}</p>

            <div>
                <button onclick="verDetalle('${juego.id}')">
                    Ver detalles
                </button>
            </div>

            <hr>
        `;

        contenedor.appendChild(card);
    });
}

function verDetalle(id) {
    window.location.href = `detalleJuego.html?id=${id}`;
}

document.getElementById("buscador").addEventListener("input", function () {
        const texto = this.value.toLowerCase();
        const resultado = listaJuegos.filter(j => j.nombre.toLowerCase().includes(texto));
        mostrarJuegos(resultado);
    }
);