'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init({
    userId: DataTypes.INTEGER,
    clockIn: DataTypes.DATE,
    clockOut: DataTypes.DATE,
    daySalary: DataTypes.INTEGER,
    isOvertime: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'History',
    createdAt : "clockIn",
    updatedAt : "clockOut",

  });
  return History;
};