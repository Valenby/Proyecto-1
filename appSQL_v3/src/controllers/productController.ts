import {Request, Response} from 'express';
import { productModel } from"../models";

type Product = {
    name: string;
    author: string;
    category: string;
    description: string;
    price: number;
    pages: number;
    availlableUnits: number;
}


//lista products.
export const getAllProducts = async (_: Request,res: Response) => {
    console.log("Product -> getAllProducts");
    const result = await productModel.find()
    res.json(result);
};

//creamos el identificador unico.
export const getProductById = async (req: Request, res: Response) => {
    console.log("Product -> getProductById");
    const product = await productModel.findById(req.params.id) as Product;
    console.log(product)

    if(!product){
        res.status(404).send('La lista de los libros no fue encontrada')
        return
    }
    res.json(product);
};

//agregamos un elemento con id unico.
export const createProduct = async (req: Request, res: Response) => {
    console.log("Product -> createProduct");
  
    const newProduct: Product = {
      name: req.body.name,
      author: req.body.author,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      pages: req.body.pages,
      availlableUnits: req.body.availlableUnits,
    };
  
    const result = await productModel.create(newProduct);
    res.json(result);
  };

//uptade
export const updateProduct = async (req: Request, res: Response) => {
    console.log("Product -> updateProduct");

    const {id} = req.params;
    const updateData = req.body;

    const result = await productModel.findByIdAndUpdate({'_id':id},updateData, {new: true}).exec() as Product;
    if (!result) {
        res.status(404).send(`Producto con id ${id} no fue encontrado`)
        return
    }
    res.status(200).json(result)
};

//delete
export const deleteProduct = async (req: Request, res: Response) => {
    console.log("Product -> deleteProduct");

     const id = req.params.id; 

    const result = await productModel.findByIdAndDelete({'_id':id})
    // devolvemos mensaje de confirmación
    res.json({message:`Libro '${id}' fue eliminado correctamente`})
};
