class XmlReader {
    static async leer(ruta) {

        try {
            const response = await fetch(ruta);

            if (!response.ok) { 
                throw new Error(`Error al cargar ${ruta}`);
            }

            const texto = await response.text();

            const parser = new DOMParser();

            const xml = parser.parseFromString(texto,"text/xml");

            return xml;

        } catch (error) {
            console.error("Error leyendo XML:", error);
            return null;
        }
    }
}
