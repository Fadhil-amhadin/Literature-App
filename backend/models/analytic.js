'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class analytic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      analytic.belongsTo(models.user), {
        as: "user",
        foreignKey: {
          name: "userId"
        }
      }
    }
  };
  analytic.init({
    userId: DataTypes.INTEGER,
    literatureDw: DataTypes.STRING,
    literatureUp: DataTypes.STRING,
    date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'analytic',
  });
  return analytic;
};