"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { productModel } = require("../models");
//lista products.
exports.getAllProducts = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Product -> getAllProducts");
    const result = yield productModel.find();
    res.json(result);
});
//creamos el identificador unico.
exports.getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Product -> getProductById");
    const product = yield productModel.findById({ '_id': req.params.id });
    console.log(product);
    if (!product) {
        res.status(404).send('La lista de los libros no fue encontrada');
        return;
    }
    res.json(product);
});
//agregamos un elemento con id unico.
exports.createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield productModel.create(newProduct);
    res.json(result);
});
//uptade
exports.updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Product -> updateProduct");
    const { id } = req.params;
    const updateData = req.body;
    const result = yield productModel.findByIdAndUpdate({ '_id': id }, updateData, { new: true }).exec();
    if (!result) {
        res.status(404).send(`Producto con id ${id} no fue encontrado`);
        return;
    }
    res.status(200).json(result);
});
//delete
exports.deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Product -> deleteProduct");
    const id = req.params.id;
    const result = yield productModel.findByIdAndDelete({ '_id': id });
    // devolvemos mensaje de confirmación
    res.json({ message: `Libro '${id}' fue eliminado correctamente` });
});
