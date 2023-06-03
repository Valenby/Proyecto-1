"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const appControllers_1 = require("../controllers/appControllers");
router
    .get("/", appControllers_1.welcomePage)
    .get("/health", appControllers_1.healthCheck)
    .use("/v1/products", require("./productRoute"))
    .use("/v1/users", require("./userRouter"))
    .use('/login', require('./authRoute'));
router.get("/login", (req, res) => {
    res.sendFile(path_1.default.resolve("views/login.html"));
});
router.get("/playground", (req, res) => {
    res.sendFile(path_1.default.resolve("views/playGround.html"));
});
exports.default = router;
