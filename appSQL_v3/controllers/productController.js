const { productModel } = require("../models");

//lista products.
exports.getAllProducts = async (_, res) => {
    console.log("Product -> getAllProducts");
    const result = await productModel.find()
    res.json(result);
};

//creamos el identificador unico.
exports.getProductById = async (req, res) => {
    console.log("Product -> getProductById");
    const product = await productModel.findById({'_id':req.params.id})
    console.log(product)

    if(!product){
        res.status(404).send('La lista de los libros no fue encontrada')
        return
    }
    res.json(product);
};

//agregamos un elemento con id unico.
exports.createProduct = async (req, res) => {
    console.log("Product -> createProduct");

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
}

//uptade
exports.updateProduct = async (req, res) => {
    console.log("Product -> updateProduct");

    const {id} = req.params;
    const updateData = req.body;

    const result = await productModel.findByIdAndUpdate({'_id':id},updateData, {new: true}).exec()
    if (!result) {
        res.status(404).send(`Producto con id ${id} no fue encontrado`)
        return
    }
    res.status(200).json(result)
};

//delete
exports.deleteProduct = async (req, res) => {
    console.log("Product -> deleteProduct");

     const id = req.params.id; 

    const result = await productModel.findByIdAndDelete({'_id':id})
    // devolvemos mensaje de confirmación
    res.json({message:`Libro '${id}' fue eliminado correctamente`})
};
