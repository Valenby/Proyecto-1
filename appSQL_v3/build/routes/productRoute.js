"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const productController_1 = __importDefault(require("../controllers/productController"));
const middlewaresJoi_1 = require("../middlewares/middlewaresJoi");
router.get("/", productController_1.default.getAllProducts);
router.get("/:id", productController_1.default.getProductById);
router.post("/", middlewaresJoi_1.validateMiddlewareCreate, productController_1.default.createProduct);
router.put("/:id", productController_1.default.updateProduct);
router.patch("/:id", middlewaresJoi_1.validateMiddlewareUpdate, productController_1.default.updateProduct);
router.delete("/:id", productController_1.default.deleteProduct);
module.exports = router;
