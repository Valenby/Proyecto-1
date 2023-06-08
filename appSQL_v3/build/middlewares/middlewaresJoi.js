"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMiddlewareUpdate = exports.validateMiddlewareCreate = void 0;
const joi_1 = __importDefault(require("joi"));
// schema para la validación
const createBookSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    author: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    price: joi_1.default.number().integer().min(0).required(),
    pages: joi_1.default.number().integer().min(0).required(),
    availlableUnits: joi_1.default.number().integer().min(0).required(),
});
const updateBookSchema = joi_1.default.object({
    name: joi_1.default.string(),
    author: joi_1.default.string(),
    category: joi_1.default.string(),
    description: joi_1.default.string(),
    price: joi_1.default.number().integer().min(0),
    pages: joi_1.default.number().integer().min(0),
    availlableUnits: joi_1.default.number().integer().min(0),
});
const validateMiddlewareCreate = (req, res, next) => {
    const { error } = createBookSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error });
    }
    next();
};
exports.validateMiddlewareCreate = validateMiddlewareCreate;
const validateMiddlewareUpdate = (req, res, next) => {
    const { error } = updateBookSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error });
    }
    next();
};
exports.validateMiddlewareUpdate = validateMiddlewareUpdate;
