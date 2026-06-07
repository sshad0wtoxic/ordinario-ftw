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
}