// file sistem
const fs = require('fs').promises;

// funcion para leer la lista en el archivos .txt
 const leerArchivo = async() => {
    try {
        const dateListBuffer = await fs.readFile('listBooks.txt');
        const dateListJavascript = JSON.parse( dateListBuffer.toString());
        return dateListJavascript;
    } catch (error) {
        console.error(error);
    }
};
// funcion para escribir texto en el archivo .txt
 const escribirArchivo = async(dateList) => {
    try {
        dateList = JSON.stringify(dateList, null, 2)
        await fs.writeFile('listBooks.txt', dateList);
      } catch (error) {
        console.error(error);
      }
};
module.exports = {
    leerArchivo,
    escribirArchivo
}