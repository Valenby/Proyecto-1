"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = new sequelize_1.Sequelize(process.env.QSL_CONNECTION);
