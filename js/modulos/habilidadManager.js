class HabilidadManager {

    static async obtenerHabilidadesDePersonaje(idPersonaje) {

        const xmlRelaciones = await XmlReader.leer("xml/personaje_habilidad.xml");
        const xmlHabilidades =await XmlReader.leer("xml/habilidades.xml");
        const relaciones = xmlRelaciones.getElementsByTagName("personaje_habilidad");
        const habilidades = xmlHabilidades.getElementsByTagName("habilidad");
        let ids = [];

        for (let i = 0;i < relaciones.length;i++) {
            if (relaciones[i].getAttribute("idPersonaje") === idPersonaje) {
                ids.push(relaciones[i].getAttribute("idHabilidad"));
            }
        }

        let resultado = [];

        for (let i = 0;i < habilidades.length;i++) {
            const habilidad = habilidades[i];
            const id = habilidad.getAttribute("id");

            if (ids.includes(id)) {
                resultado.push(habilidad);
            }
        }

        return resultado;
    }

    static async obtenerTodos() {
    const xml = await XmlReader.leer("xml/habilidades.xml");
    return xml.getElementsByTagName("habilidad");
}

static async obtenerPorId(idBuscado) {
    const habilidades = await this.obtenerTodos();
    for (let i = 0; i < habilidades.length; i++) {

        if (habilidades[i].getAttribute("id") === idBuscado) {
            return habilidades[i];
        }
    }

    return null;
    }

    static async obtenerPersonajes(idHabilidad) {
    const xmlRelaciones = await XmlReader.leer("xml/personaje_habilidad.xml");
    const xmlPersonajes = await XmlReader.leer("xml/personajes.xml");
    const relaciones = xmlRelaciones.getElementsByTagName("personaje_habilidad");
    const personajes = xmlPersonajes.getElementsByTagName("personaje");
    let ids = [];

    for (let i = 0; i < relaciones.length; i++) {

        if (relaciones[i].getAttribute("idHabilidad") === idHabilidad) {
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