'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class literature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      literature.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "userId"
        }
      })
    }
  };
  literature.init({
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    publication_date: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    ISBN: DataTypes.STRING,
    author: DataTypes.STRING,
    attachment: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'literature',
  });
  return literature;
};