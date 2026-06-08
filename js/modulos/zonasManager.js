class ZonaManager {

    static async obtenerZonasDePersonaje(idPersonaje) {
        const xmlRelaciones = await XmlReader.leer("xml/personaje_zona.xml");
        const xmlZonas = await XmlReader.leer("xml/zonas.xml");
        const relaciones =xmlRelaciones.getElementsByTagName("personaje_zona");
        const zonas = xmlZonas.getElementsByTagName("zona");
        let ids = [];

        for (let i = 0; i < relaciones.length; i++) {

            if (relaciones[i].getAttribute("idPersonaje") === idPersonaje) {
                ids.push(relaciones[i].getAttribute("idZona"));
            }
        }

        let resultado = [];

        for (let i = 0; i < zonas.length; i++) {

            const zona = zonas[i];
            const id = zona.getAttribute("id");

            if (ids.includes(id)) {
                resultado.push(zona);
            }
        }

        return resultado;
    }

    static async obtenerTodos() {
        const xml = await XmlReader.leer("xml/zonas.xml");
        return xml.getElementsByTagName("zona");
    }

    static async obtenerPorId(idBuscado) {
    const zonas = await this.obtenerTodos();

    for (let i = 0;i < zonas.length;i++) {

        if (zonas[i].getAttribute("id")=== idBuscado) {
            return zonas[i];
        }
    }

    return null;
    }

    static async obtenerJuegos(idZona) {
    const xmlRelaciones = await XmlReader.leer("xml/juego_zona.xml");
    const xmlJuegos = await XmlReader.leer("xml/juegos.xml");
    const relaciones = xmlRelaciones.getElementsByTagName("juego_zona");
    const juegos = xmlJuegos.getElementsByTagName("juego");
    let ids = [];

    for (let i = 0; i < relaciones.length; i++) {

        if (relaciones[i].getAttribute("idZona") === idZona) {
            ids.push(relaciones[i].getAttribute("idJuego"));
        }
    }

    let resultado = [];

    for (let i = 0; i < juegos.length; i++) {
        const juego = juegos[i];

        if (ids.includes(juego.getAttribute("id"))) {
            resultado.push(juego);
        }
    }

    return resultado;
    }

    static async obtenerPersonajes(idZona) {
    const xmlRelaciones = await XmlReader.leer("xml/personaje_zona.xml");
    const xmlPersonajes = await XmlReader.leer("xml/personajes.xml");
    const relaciones = xmlRelaciones.getElementsByTagName("personaje_zona");
    const personajes = xmlPersonajes.getElementsByTagName("personaje");
    let ids = [];

    for (let i = 0; i < relaciones.length; i++) {

        if (relaciones[i].getAttribute("idZona") === idZona) {
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
}