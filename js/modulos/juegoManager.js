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
}