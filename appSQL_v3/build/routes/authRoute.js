"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const authControllers_1 = __importDefault(require("../controllers/authControllers"));
router.post('/', authControllers_1.default.signIn);
module.exports = router;
