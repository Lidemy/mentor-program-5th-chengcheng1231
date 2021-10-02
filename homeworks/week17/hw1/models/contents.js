'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hw17_contents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      hw17_contents.belongsTo(models.hw17_users);
    }
  };
  hw17_contents.init({
    username: DataTypes.STRING,
    article_titile: DataTypes.STRING,
    article_content: DataTypes.TEXT,
    is_deleted: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'hw17_contents',
  });
  return hw17_contents;
};