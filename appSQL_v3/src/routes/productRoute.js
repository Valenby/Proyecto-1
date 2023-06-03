import { Router } from "express";
const router = Router();
import productController from "../controllers/productController";
import {validateMiddlewareCreate, validateMiddlewareUpdate} from'../middlewares/middlewaresJoi';

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

router.post("/", validateMiddlewareCreate, productController.createProduct);
router.put("/:id", productController.updateProduct);
router.patch("/:id", validateMiddlewareUpdate, productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;