// sistema que encripta la contraseña

import crypto from"crypto";
const SALT = "sAruQ44A0jDbw0gr";
// hasheo de la password para que no quede plana en la db
exports.encryptPassword = (password) => crypto.pbkdf2Sync(password, SALT, 1000, 64, `sha512`).toString(`hex`);