"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//definimos estructura de lo que necesitamos
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = mongoose_1.default.Schema({
    name: { type: String, required: true },
    author: { type: String, required: false },
    category: { type: String, required: false },
    description: { type: String, required: false },
    pages: { type: Number, required: false },
    availlableUnits: { type: Number, required: false, default: 0 },
    price: { type: Number, required: true },
});
const productModel = mongoose_1.default.model("products", productSchema);
module.exports = {
    productModel
};
