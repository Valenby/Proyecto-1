//inicialización del cliente en express
const express = require('express');
const PORT = 3000;
const app = express();
app.use(express.json()); //middleware para leer json en las solicitudes.

const Joi = require('joi');

// schema para la validación
const productSchema = Joi.object({
    title: Joi.string().when('$method', {is: 'POST', then: Joi.required() }),
    author: Joi.string(),
    category: Joi.string(),
    description: Joi.string(),
    price: Joi.number().when('$method', {is: 'POST', then: Joi.required() }),
    pages: Joi.number().required(),
    unit: Joi.number(),
}).when('$method', {
    is: Joi.string().valid('PATCH'),
    then: Joi.object({
        title: Joi.string().optional,
        author: Joi.string().optional,
        category: Joi.string().optional,
        description: Joi.string().optional,
        price: Joi.number().optional,
        pages: Joi.number().optional,
        unit: Joi.number().optional,  
    }),
});

// Middleware para validar datos de entrada en todas las peticiones http
const validateMiddleware  = (req, res, next) => {
    const schema = productSchema.extend((joi) => {
        return {
          base: joi,
          type: 'object',
          messages: {
            'object.base': 'Invalid payload',
          },
        };
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ error: error.details.map(d => d.message) });
    }
    
    next();
}


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
        console.log('Escribimos un nuevo book en la lista');
      } catch (error) {
        console.error(error);
      }
};

//creamos ruta padre
app.get('/', (req, res) => {
    res.send('App books')
});

//definimos ruta de entrada para los products.
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
app.post('/api/v1/books/create',validateMiddleware, async(req, res) => {

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
app.patch('/api/v1/books/update/:id', async(req, res) => {

    const result = await leerArchivo();

    const {id} = req.params;
    const updateData = req.body;

    //buscamos indice del producto
    const bookIndex = result.libros.findIndex( (book) => book.id == id );

    //utilizamos indice para actualizar los datos del produc
    if(bookIndex !== -1){
        result.libros[bookIndex] = { ...result.libros[bookIndex], ...updateData};
        //escribimos en la lista
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
