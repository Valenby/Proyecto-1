const {validateMiddlewareCreate, validateMiddlewareUpdate} = require('./middlewaresJoi')
// const {leerArchivo, escribirArchivo} = require('./fileSistem');
const {Router} = require("express");
const {productModel} = require("./models");
const routes = new Router();

routes.get("/health", (_, res) => res.send("check"));

//creamos ruta inicial
routes.get('/', (req, res) => {
    res.send('App products')
});

//definimos ruta de entrada para la lista .
routes.get('/api/v1/products/list', async(req, res) => {
    // const result = await leerArchivo();
    const result = await productModel.find()
    res.json(result);
});

//creamos el identificador unico.
routes.get('/api/v1/products/list/:id', async(req, res) => {

    const product = await productModel.findById({'_id':req.params.id})
    // const result = await leerArchivo();

    // const idList = parseInt(req.params.id); 
    // const book = result.libros.find( (book) => book.id === idList)
    console.log(product)
    if(!product){
        res.status(404).send('La lista de los libros no fue encontrada')
        return
    }

    // devolvemos el libro encontrado con su id unico.
    res.json(product);
});

//agregamos un elemento con id unico.
routes.post('/api/v1/products/create', validateMiddlewareCreate ,async(req, res) => {

    // const result = await leerArchivo();
    //objeto con el nuevo producto.
    const newProduct = {
        // id: result.libros.length + 1,
        name: req.body.name,
        author: req.body.author,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        pages: req.body.pages,
        availlableUnits: req.body.availlableUnits,
    };
    
    // agregamos nuevo book al array
    // result.libros.push(newProduct);

    const result = await productModel.create(newProduct)

     //escribimos lo que quedo en la lista
    // await escribirArchivo(result)

    // devolvemos el producto con su id
    res.json(result)
});

//actualizamos producto con id unico
routes.patch('/api/v1/products/update/:id',validateMiddlewareUpdate, async(req, res) => {

    // const result = await leerArchivo();

    const {id} = req.params;
    const updateData = req.body;

    //buscamos indice del producto
    // const bookIndex = result.libros.findIndex( (book) => book.id == id );

    //utilizamos indice para actualizar los datos del produc
    // if(bookIndex !== -1){
    //     result.libros[bookIndex] = { ...result.libros[bookIndex], ...updateData};
    //     //escribimos los datos actualizados 
    //     await escribirArchivo(result);
    //     res.status(200).json(result.libros[bookIndex]);
    // } else {
    //     res.status(404).send(`Producto con id ${id} no fue encontrado`)
    // }

    const result = await productModel.findByIdAndUpdate({'_id':id},updateData, {new: true}).exec()
    if (!result) {
        res.status(404).send(`Producto con id ${id} no fue encontrado`)
        return
    }
    res.status(200).json(result)
});

//eliminamos producto con id unico
routes.delete('/api/v1/products/delete/:id', async(req, res) => {

    // const result = await leerArchivo();

    const id = req.params.id; 

    // const posicionesArray = result.libros.findIndex(lista => lista.id === id);
    //  const tituloId = result.libros[posicionesArray].title;

    // if (posicionesArray !== -1) {
    //     result.libros.splice(posicionesArray, 1); // eliminamos elemnt
    // }else {
    //     throw new Error('Producto no encontrado')
    // }

     //escribimos lo que quedo en la lista
    //  await escribirArchivo(result)

    const result = await productModel.findByIdAndDelete({'_id':id})
    // devolvemos mensaje de confirmación
    res.json({message:`Libro '${id}' fue eliminado correctamente`})
});

module.exports = routes;