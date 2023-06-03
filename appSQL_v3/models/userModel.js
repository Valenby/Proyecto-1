const {DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/postgresql');
const { encryptPassword } = require('../utils/authentication')

class user extends Model {
    static login(email, password) {
        return user.findOne({
          where: { email, password: encryptPassword(password) },
          
        }, );
      }
}

//instancia de clase modelo. 
user.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },  
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(password) {
        this.setDataValue("password", encryptPassword(password));
      }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
  },{
    sequelize,
    modelName: 'user',
    tableName: 'user'
  });

  module.exports = user;

