class JuegoManager {
    static async obtenerJuegosDePersonaje(idPersonaje) {

        const xmlRelaciones = await XmlReader.leer("xml/personaje_juego.xml");
        const xmlJuegos = await XmlReader.leer("xml/juegos.xml");
        const relaciones = xmlRelaciones.getElementsByTagName("personaje_juego");
        const juegos = xmlJuegos.getElementsByTagName("juego");
        let ids = [];

        for (let i = 0; i < relaciones.length; i++) {

            if (relaciones[i].getAttribute("idPersonaje") === idPersonaje) {
                ids.push(relaciones[i].getAttribute("idJuego"));
            }
        }

        let resultado = [];

        for (let i = 0; i < juegos.length; i++) {
            const juego = juegos[i];
            const id = juego.getAttribute("id");

            if (ids.includes(id)) {
                resultado.push(juego);
            }
        }

        return resultado;
    }

    static async obtenerTodos() {
        const xml = await XmlReader.leer("xml/juegos.xml");
        return xml.getElementsByTagName("juego");
    }

    static async obtenerPorId(idBuscado) {
    const juegos = await this.obtenerTodos();

    for (let i = 0;i < juegos.length;i++) {

        if (juegos[i].getAttribute("id")=== idBuscado) {
            return juegos[i];
        }
    }

    return null;
    }

    static async obtenerPersonajes(idJuego) {
    const xmlRelaciones =await XmlReader.leer("xml/personaje_juego.xml");
    const xmlPersonajes =await XmlReader.leer("xml/personajes.xml");
    const relaciones = xmlRelaciones.getElementsByTagName("personaje_juego");
    const personajes = xmlPersonajes.getElementsByTagName("personaje");
    let ids = [];

    for (let i = 0; i < relaciones.length; i++) {
        if (relaciones[i].getAttribute("idJuego") === idJuego) {
            ids.push(relaciones[i].getAttribute("idPersonaje"));
        }
    }

    let resultado = [];

    for (let i = 0; i < personajes.length; i++) {
        const personaje = personajes[i];

        if (ids.includes(personaje.getAttribute("id"))) {
            resultado.push(personaje);
        }
    }

    return resultado;
    }

    static async obtenerZonas(idJuego) {
    const xmlRelaciones = await XmlReader.leer("xml/juego_zona.xml");
    const xmlZonas = await XmlReader.leer("xml/zonas.xml");
    const relaciones = xmlRelaciones.getElementsByTagName("juego_zona");
    const zonas = xmlZonas.getElementsByTagName("zona");
    let ids = [];

    for (let i = 0; i < relaciones.length; i++) {

        if (relaciones[i].getAttribute("idJuego")=== idJuego) {
            ids.push(relaciones[i].getAttribute("idZona"));
        }
    }

    let resultado = [];

    for (let i = 0; i < zonas.length; i++) {
        const zona = zonas[i];

        if (ids.includes(zona.getAttribute("id"))) {
            resultado.push(zona);
        }
    }

    return resultado;
    }
}