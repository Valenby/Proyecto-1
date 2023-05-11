const { Sequelize } = require("sequelize");

module.exports = new Sequelize(process.env.QSL_CONNECTION);