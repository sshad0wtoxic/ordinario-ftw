cargarEstadisticas();

async function cargarEstadisticas() {
    const xmlPersonajes = await XmlReader.leer("xml/personajes.xml");
    const xmlJuegos = await XmlReader.leer("xml/juegos.xml");
    const xmlZonas = await XmlReader.leer("xml/zonas.xml");
    const xmlHabilidades = await XmlReader.leer("xml/habilidades.xml");
    const personajes = xmlPersonajes.getElementsByTagName("personaje");
    const juegos = xmlJuegos.getElementsByTagName("juego");
    const zonas = xmlZonas.getElementsByTagName("zona");
    const habilidades = xmlHabilidades.getElementsByTagName("habilidad");

    document.getElementById("totalPersonajes").textContent = `Personajes: ${personajes.length}`;
    document.getElementById("totalJuegos").textContent = `Juegos: ${juegos.length}`;
    document.getElementById("totalZonas").textContent = `Zonas: ${zonas.length}`;
    document.getElementById("totalHabilidades").textContent = `Habilidades: ${habilidades.length}`;

    let heroes = 0;
    let antiheroes = 0;
    let villanos = 0;

    for (let i = 0; i < personajes.length; i++) {
        const alineacion =personajes[i].getElementsByTagName("alineacion")[0].textContent;

        if (alineacion === "Heroe") {
            heroes++;
        }

        else if (alineacion === "Antiheroe") {
            antiheroes++;
        }

        else if (alineacion === "Villano") {
            villanos++;
        }
    }

    document.getElementById("heroes").textContent = `Héroes: ${heroes}`;
    document.getElementById("antiheroes").textContent =`Antihéroes: ${antiheroes}`;
    document.getElementById("villanos").textContent =`Villanos: ${villanos}`;

    let listaPersonajes = [];

    for (let i = 0; i < personajes.length; i++) {
        const personaje = personajes[i];
        listaPersonajes.push({

            nombre:personaje.getElementsByTagName("nombre")[0].textContent,
            velocidad:parseInt(personaje.getElementsByTagName("velocidad")[0].textContent),
            fuerza:parseInt(personaje.getElementsByTagName("fuerza")[0].textContent),
            inteligencia:parseInt(personaje.getElementsByTagName("inteligencia")[0].textContent)
        });
    }

    //TOP 5 PERSONAJES POR VELOCIDAD, FUERZA E INTELIGENCIA
    //Velocidad
    const topVelocidad =
    [...listaPersonajes].sort(
        (a, b) =>
            b.velocidad - a.velocidad
    ).slice(0, 5);

    const listaVelocidad =document.getElementById("topVelocidad");

    topVelocidad.forEach(personaje => {
        const li =document.createElement("li");
        li.textContent = `${personaje.nombre} (${personaje.velocidad})`;
        listaVelocidad.appendChild(li);
    });

    //Fuerza
    const topFuerza =
    [...listaPersonajes].sort(
        (a, b) =>
            b.fuerza - a.fuerza
    ).slice(0, 5);

    const listaFuerza =document.getElementById("topFuerza");

    topFuerza.forEach(personaje => {
        const li =document.createElement("li");
        li.textContent = `${personaje.nombre} (${personaje.fuerza})`;
        listaFuerza.appendChild(li);
    });

    //Inteligencia

    const topInteligencia =
    [...listaPersonajes].sort(
        (a, b) =>
            b.inteligencia - a.inteligencia
    ).slice(0, 5);

    const listaInteligencia =document.getElementById("topInteligencia");

    topInteligencia.forEach(personaje => {
        const li =document.createElement("li");
        li.textContent = `${personaje.nombre} (${personaje.inteligencia})`;
        listaInteligencia.appendChild(li);
    });

    //JUEGO CON MÁS PERSONAJES
    const xmlPersonajeJuego = await XmlReader.leer("xml/personaje_juego.xml");  
    const relacionesJuego = xmlPersonajeJuego.getElementsByTagName("personaje_juego");
    let conteoJuegos = {};

    for (let i = 0; i < relacionesJuego.length; i++) {
        const idJuego = relacionesJuego[i].getAttribute("idJuego");

        if (!conteoJuegos[idJuego]) {
            conteoJuegos[idJuego] = 0;
        }

        conteoJuegos[idJuego]++;
    }

    let juegoGanador = "";
    let maxPersonajes = 0;

    for (const idJuego in conteoJuegos) {

        if (conteoJuegos[idJuego] > maxPersonajes) {

            maxPersonajes = conteoJuegos[idJuego];
            juegoGanador =idJuego;
        }
    }

    let nombreJuego = "";

    for (let i = 0; i < juegos.length; i++) {

        if (juegos[i].getAttribute("id") === juegoGanador) {
            nombreJuego = juegos[i].getElementsByTagName("nombre")[0].textContent;
            break;
        }
    }

    document.getElementById("juegoMasPersonajes").textContent =`Juego con más personajes: ${nombreJuego} (${maxPersonajes})`;

    //ZONA CON MÁS PERSONAJES
    const xmlPersonajeZona =
    await XmlReader.leer("xml/personaje_zona.xml");
    const relacionesZona = xmlPersonajeZona.getElementsByTagName("personaje_zona");
    let conteoZonas = {};

    for (let i = 0; i < relacionesZona.length; i++) {
    const idZona = relacionesZona[i].getAttribute("idZona");

    if (!conteoZonas[idZona]) {
        conteoZonas[idZona] = 0;
    }

    conteoZonas[idZona]++;
    }

    let zonaGanadora = "";
    let maxZona = 0;

    for (const idZona in conteoZonas) {

        if (conteoZonas[idZona] > maxZona) {
            maxZona = conteoZonas[idZona];
            zonaGanadora = idZona;
        }
    }

    let nombreZona = "";

    for (let i = 0; i < zonas.length; i++) {
        if (zonas[i].getAttribute("id") === zonaGanadora) {
            nombreZona = zonas[i].getElementsByTagName("nombre")[0].textContent;
            break;
        }
    }

    document.getElementById("zonaMasPersonajes").textContent =`Zona con más personajes: ${nombreZona} (${maxZona})`;

    //HABILIDAD MÁS COMÚN
    const xmlPersonajeHabilidad = await XmlReader.leer("xml/personaje_habilidad.xml");
    const relacionesHabilidad = xmlPersonajeHabilidad.getElementsByTagName("personaje_habilidad");
    let conteoHabilidades = {}; 
    
    for (let i = 0; i < relacionesHabilidad.length; i++) {
        const idHabilidad = relacionesHabilidad[i].getAttribute("idHabilidad");
        if (!conteoHabilidades[idHabilidad]) {
            conteoHabilidades[idHabilidad] = 0;
        }   
        conteoHabilidades[idHabilidad]++;
    }

    let habilidadGanadora = "";
    let maxHabilidad = 0;

    for (const idHabilidad in conteoHabilidades) {
        if (conteoHabilidades[idHabilidad] > maxHabilidad) {
            maxHabilidad = conteoHabilidades[idHabilidad];
            habilidadGanadora = idHabilidad;
        }
    }

    let nombreHabilidad = "";

    for (let i = 0; i < habilidades.length; i++) {
        if (habilidades[i].getAttribute("id") === habilidadGanadora) {
            nombreHabilidad = habilidades[i].getElementsByTagName("nombre")[0].textContent;
            break;
        }
    }

    document.getElementById("habilidadMasComun").textContent =`Habilidad más común: ${nombreHabilidad} (${maxHabilidad})`;

    
}
