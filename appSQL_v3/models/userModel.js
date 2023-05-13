const {DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/postgresql');

class user extends Model {}

//instancia d eclase modelo. 
user.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
  },{
    sequelize,
    modelName: 'user',
    tableName: 'user'
  });

  module.exports = user;

