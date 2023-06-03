"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const postgresql_1 = __importDefault(require("../utils/postgresql"));
const authentication_1 = require("../utils/authentication");
class user extends sequelize_1.Model {
    static login(email, password) {
        return user.findOne({
            where: { email, password: (0, authentication_1.encryptPassword)(password) },
        });
    }
}
//instancia de clase modelo. 
user.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        set(password) {
            this.setDataValue("password", (0, authentication_1.encryptPassword)(password));
        }
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: postgresql_1.default,
    modelName: 'user',
    tableName: 'user'
});
module.exports = user;
