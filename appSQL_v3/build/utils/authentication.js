"use strict";
// sistema que encripta la contraseña
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const SALT = "sAruQ44A0jDbw0gr";
// hasheo de la password para que no quede plana en la db
exports.encryptPassword = (password) => crypto_1.default.pbkdf2Sync(password, SALT, 1000, 64, `sha512`).toString(`hex`);
