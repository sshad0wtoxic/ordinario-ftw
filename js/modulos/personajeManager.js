class PersonajeManager {

    static async obtenerTodos() {

        const xml = await XmlReader.leer("xml/personajes.xml");
        return xml.getElementsByTagName("personaje");
    }

    static async obtenerPorId(idBuscado) {

        const personajes = await this.obtenerTodos();

        for (let i = 0;i < personajes.length;i++) {

            if (personajes[i].getAttribute("id") === idBuscado) {
                return personajes[i];
            }
        }

        return null;
    }
}