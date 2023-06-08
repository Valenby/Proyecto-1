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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const models_1 = require("../models");
//lista products.
const getAllProducts = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Product -> getAllProducts");
    const result = yield models_1.productModel.find();
    res.json(result);
});
exports.getAllProducts = getAllProducts;
//creamos el identificador unico.
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Product -> getProductById");
    const product = yield models_1.productModel.findById(req.params.id);
    console.log(product);
    if (!product) {
        res.status(404).send('La lista de los libros no fue encontrada');
        return;
    }
    res.json(product);
});
exports.getProductById = getProductById;
//agregamos un elemento con id unico.
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield models_1.productModel.create(newProduct);
    res.json(result);
});
exports.createProduct = createProduct;
//uptade
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Product -> updateProduct");
    const { id } = req.params;
    const updateData = req.body;
    const result = yield models_1.productModel.findByIdAndUpdate({ '_id': id }, updateData, { new: true }).exec();
    if (!result) {
        res.status(404).send(`Producto con id ${id} no fue encontrado`);
        return;
    }
    res.status(200).json(result);
});
exports.updateProduct = updateProduct;
//delete
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Product -> deleteProduct");
    const id = req.params.id;
    const result = yield models_1.productModel.findByIdAndDelete({ '_id': id });
    // devolvemos mensaje de confirmación
    res.json({ message: `Libro '${id}' fue eliminado correctamente` });
});
exports.deleteProduct = deleteProduct;
