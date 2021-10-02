'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hw17_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      hw17_users.hasMany(models.hw17_contents); // contents 指的不是 models 資料夾底下的名稱，是裡面定義的內容
    }
  };
  
  hw17_users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    about: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'hw17_users',
  });
  return hw17_users;
};