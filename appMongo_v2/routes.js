const {validateMiddlewareCreate, validateMiddlewareUpdate} = require('./middlewaresJoi')
const {Router} = require("express");
const {productModel} = require("./models");
const routes = new Router();

//verificamos estado del servidor 
routes.get("/health", (_, res) => res.send("check"));

routes.get('/', (req, res) => {
    res.send('App products')
});

//lista products.
routes.get('/api/v1/products/list', async(req, res) => {

    const result = await productModel.find()

    res.json(result);
});

//creamos el identificador unico.
routes.get('/api/v1/products/list/:id', async(req, res) => {

    const product = await productModel.findById({'_id':req.params.id})

    console.log(product)
    if(!product){
        res.status(404).send('La lista de los libros no fue encontrada')
        return
    }

    res.json(product);
});

//agregamos un elemento con id unico.
routes.post('/api/v1/products/create', validateMiddlewareCreate ,async(req, res) => {

    const newProduct = {
        name: req.body.name,
        author: req.body.author,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        pages: req.body.pages,
        availlableUnits: req.body.availlableUnits,
    };
    
    const result = await productModel.create(newProduct)
    
    res.json(result)
});

//uptade
routes.patch('/api/v1/products/update/:id',validateMiddlewareUpdate, async(req, res) => {

    const {id} = req.params;
    const updateData = req.body;

    const result = await productModel.findByIdAndUpdate({'_id':id},updateData, {new: true}).exec()
    if (!result) {
        res.status(404).send(`Producto con id ${id} no fue encontrado`)
        return
    }
    res.status(200).json(result)
});

//delete
routes.delete('/api/v1/products/delete/:id', async(req, res) => {

    const id = req.params.id; 

    const result = await productModel.findByIdAndDelete({'_id':id})
    // devolvemos mensaje de confirmación
    res.json({message:`Libro '${id}' fue eliminado correctamente`})
});

module.exports = routes;