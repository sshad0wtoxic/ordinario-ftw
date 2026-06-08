
let listaHabilidades = [];
cargarHabilidades();

async function cargarHabilidades() {
    const habilidades = await HabilidadManager.obtenerTodos();

    for (let i = 0; i < habilidades.length; i++) {
        const habilidad =habilidades[i];
        listaHabilidades.push({
            id: habilidad.getAttribute("id"),
            nombre:habilidad.getElementsByTagName("nombre")[0].textContent,
            tipo:habilidad.getElementsByTagName("tipo")[0].textContent
        });
    }

    document.getElementById("contador").textContent = `Total de habilidades: ${listaHabilidades.length}`;
    mostrarHabilidades(listaHabilidades);
}

function mostrarHabilidades(habilidades) {
    const contenedor = document.getElementById("contenedorHabilidades");
    contenedor.innerHTML = "";

    habilidades.forEach(habilidad => {

        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `

            <h3>${habilidad.nombre}</h3>
            <br>

            <p>${habilidad.tipo}</p>
            <br>

            <button onclick="verDetalle('${habilidad.id}')">
                Ver detalles
            </button>

        `;

        contenedor.appendChild(card);
    });
}

document.getElementById("buscador").addEventListener("input", function () {
    const texto = this.value.toLowerCase();
    const resultado = listaHabilidades.filter(h =>h.nombre.toLowerCase().includes(texto));
    mostrarHabilidades(resultado);
});

function verDetalle(id) {
    window.location.href =  `detalleHabilidad.html?id=${id}`;
}
