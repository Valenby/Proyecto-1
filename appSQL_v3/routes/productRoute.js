const { Router } = require("express");
const router = Router();
const productController = require("../controllers/productController");
const {validateMiddlewareCreate, validateMiddlewareUpdate} = require('../middlewares/middlewaresJoi')

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

router.post("/", validateMiddlewareCreate, productController.createProduct);
router.put("/:id", productController.updateProduct);
router.patch("/:id", validateMiddlewareUpdate, productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;