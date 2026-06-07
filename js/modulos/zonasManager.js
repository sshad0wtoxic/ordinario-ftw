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
}