//inicialización del cliente en express
const express = require('express');
const PORT = 3000;
const app = express();

const {validateMiddlewareCreate, validateMiddlewareUpdate} = require('./middlewaresJoi')
const {leerArchivo, escribirArchivo} = require('./fileSistem');

app.use(express.json());


//creamos ruta inicial
app.get('/', (req, res) => {
    res.send('App books')
});

//definimos ruta de entrada para la lista .
app.get('/api/v1/books/list', async(req, res) => {
    const result = await leerArchivo();
    res.json(result);
});

//creamos el identificador unico.
app.get('/api/v1/books/list/:id', async(req, res) => {

    const result = await leerArchivo();

    const idList = parseInt(req.params.id); 
    const book = result.libros.find( (book) => book.id === idList)

    if(!book){
        res.status(404).send('La lista de los libros no fue encontrada')
    }

    // devolvemos el libro encontrado con su id unico.
    res.json(book);
});

//agregamos un elemento con id unico.
app.post('/api/v1/books/create',validateMiddlewareCreate, async(req, res) => {

    const result = await leerArchivo();

    //objeto con el nuevo producto.
    const newBook = {
        id: result.libros.length + 1,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        pages: req.body.pages,
        unit: req.body.unit,
    };
    
    // agregamos nuevo book al array
    result.libros.push(newBook);

     //escribimos lo que quedo en la lista
    await escribirArchivo(result)

    // devolvemos el producto con su id
    res.json(result)
});

//actualizamos producto con id unico
app.patch('/api/v1/books/update/:id',validateMiddlewareUpdate, async(req, res) => {

    const result = await leerArchivo();

    const {id} = req.params;
    const updateData = req.body;

    //buscamos indice del producto
    const bookIndex = result.libros.findIndex( (book) => book.id == id );

    //utilizamos indice para actualizar los datos del produc
    if(bookIndex !== -1){
        result.libros[bookIndex] = { ...result.libros[bookIndex], ...updateData};
        //escribimos los datos actualizados 
        await escribirArchivo(result);
        res.status(200).json(result.libros[bookIndex]);
    } else {
        res.status(404).send(`Producto con id ${id} no fue encontrado`)
    }

});

//eliminamos producto con id unico
app.delete('/api/v1/books/delete/:id', async(req, res) => {

    const result = await leerArchivo();

    const id = parseInt(req.params.id); 

    const posicionesArray = result.libros.findIndex(lista => lista.id === id);
    const tituloId = result.libros[posicionesArray].title;

    if (posicionesArray !== -1) {
        result.libros.splice(posicionesArray, 1); // eliminamos elemnt
    }else {
        throw new Error('Producto no encontrado')
    }

     //escribimos lo que quedo en la lista
     await escribirArchivo(result)

    // devolvemos mensaje de confirmación
    res.json({message:`Libro '${tituloId}' fue eliminado correctamente`})
});

app.listen(PORT, () => {
    console.log('Port listening')
});



