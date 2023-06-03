import { Sequelize } from "sequelize";

module.exports = new Sequelize(process.env.QSL_CONNECTION);