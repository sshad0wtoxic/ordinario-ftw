let listaPersonajes = [];
cargarPersonajes();

async function cargarPersonajes() {

    const personajes = await PersonajeManager.obtenerTodos();
    const select1 = document.getElementById("personaje1");
    const select2 = document.getElementById("personaje2");

    for (let i = 0; i < personajes.length; i++) {
        const personaje = personajes[i];
        listaPersonajes.push(personaje);
        
        const id =personaje.getAttribute("id");
        const nombre = personaje.getElementsByTagName("nombre")[0].textContent;

        const opcion1 = document.createElement("option");
        opcion1.value = id;
        opcion1.textContent = nombre;

        const opcion2 = document.createElement("option");
        opcion2.value = id;
        opcion2.textContent = nombre;

        select1.appendChild(opcion1);
        select2.appendChild(opcion2);
    }
}

function comparar() {
    const id1 = document.getElementById("personaje1").value;
    const id2 = document.getElementById("personaje2").value;

    const personaje1 = obtenerPersonaje(id1);
    const personaje2 =obtenerPersonaje(id2);
    mostrarComparacion(personaje1,personaje2);
}

function obtenerPersonaje(idBuscado) {
    for (let i = 0; i < listaPersonajes.length; i++) {

        if (listaPersonajes[i].getAttribute("id")=== idBuscado) {
            return listaPersonajes[i];
        }
    }

    return null;
}

function mostrarComparacion(personaje1, personaje2) {

    const nombre1 = personaje1.getElementsByTagName("nombre")[0].textContent;
    const nombre2 = personaje2.getElementsByTagName("nombre")[0].textContent;

    const velocidad1 = personaje1.getElementsByTagName("velocidad")[0].textContent;
    const velocidad2 = personaje2.getElementsByTagName("velocidad")[0].textContent;

    const fuerza1 = personaje1.getElementsByTagName("fuerza")[0].textContent;
    const fuerza2 = personaje2.getElementsByTagName("fuerza")[0].textContent;

    const inteligencia1 = personaje1.getElementsByTagName("inteligencia")[0].textContent;
    const inteligencia2 =personaje2.getElementsByTagName("inteligencia")[0].textContent;

    let puntos1 = 0;
    let puntos2 = 0;

    /* ==========================
        VELOCIDAD
    ========================== */

    let ganadorVelocidad = "Empate";
    if (parseInt(velocidad1) > parseInt(velocidad2)) {
        ganadorVelocidad = nombre1;
        puntos1++;
    } else if (parseInt(velocidad2) > parseInt(velocidad1)) {
        ganadorVelocidad = nombre2;
        puntos2++;
    }

    /* ==========================
        FUERZA
    ========================== */

    let ganadorFuerza = "Empate";
    if (parseInt(fuerza1) > parseInt(fuerza2)) {
        ganadorFuerza = nombre1;
        puntos1++;
    } else if (parseInt(fuerza2) > parseInt(fuerza1)) {
        ganadorFuerza = nombre2;
        puntos2++;
    }

    /* ==========================
        INTELIGENCIA
    ========================== */

    let ganadorInteligencia = "Empate";
    if (parseInt(inteligencia1) > parseInt(inteligencia2)) {
        ganadorInteligencia = nombre1;
        puntos1++;
    } else if (parseInt(inteligencia2) > parseInt(inteligencia1)) {
        ganadorInteligencia = nombre2;
        puntos2++;
    }

    /* ==========================
        GANADOR GENERAL
    ========================== */

    let ganadorGeneral = "Empate";
    if (puntos1 > puntos2) {
        ganadorGeneral = nombre1;
    } else if (puntos2 > puntos1) {
        ganadorGeneral = nombre2;
    }

    const imagen1 = personaje1.getElementsByTagName("imagen")[0].textContent;
    const imagen2 = personaje2.getElementsByTagName("imagen")[0].textContent;

    document.getElementById("resultado").innerHTML = `

    <div>

        <img src="${imagen1}"width="200">
        <h2>${nombre1}</h2>

    </div>

    <div>

        <img src="${imagen2}" width="200">
        <h2>${nombre2}</h2>

    </div>

    <hr>

    <h3>Velocidad</h3>

    ${nombre1}
    <progress value="${velocidad1}" max="100"></progress>
    ${velocidad1}

    <br><br>

    ${nombre2}
    <progress value="${velocidad2}" max="100"></progress>
    ${velocidad2}

    <p>
        🏆 Ganador: ${ganadorVelocidad}
    </p>

    <hr>

    <h3>Fuerza</h3>

    ${nombre1}
    <progress value="${fuerza1}" max="100"></progress>
    ${fuerza1}

    <br><br>

    ${nombre2}
    <progress value="${fuerza2}" max="100"></progress>
    ${fuerza2}

    <p>
        🏆 Ganador: ${ganadorFuerza}
    </p>

    <hr>

    <h3>Inteligencia</h3>

    ${nombre1}
    <progress value="${inteligencia1}" max="100"></progress>
    ${inteligencia1}

    <br><br>

    ${nombre2}
    <progress value="${inteligencia2}" max="100"></progress>
    ${inteligencia2}

    <p>
        🏆 Ganador: ${ganadorInteligencia}
    </p>

    <hr>

    <h2>
        🏆 Ganador General:
        ${ganadorGeneral}
    </h2>

    <p>
        ${nombre1}: ${puntos1} puntos
    </p>

    <p>
        ${nombre2}: ${puntos2} puntos
    </p>
`;
}