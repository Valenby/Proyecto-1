
import { Router } from "express";
const router = Router();
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController";
import  {validateMiddlewareUpdate} from'../middlewares/middlewaresJoi';
import {validateMiddlewareCreate} from '../middlewares/middlewaresJoi';

router.get("/",getAllProducts);
router.get("/:id", getProductById);

router.post("/", validateMiddlewareCreate, createProduct);
router.put("/:id", updateProduct);
router.patch("/:id", validateMiddlewareUpdate, updateProduct);
router.delete("/:id", deleteProduct);

export default router;

