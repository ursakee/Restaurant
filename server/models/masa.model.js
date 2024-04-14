const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Masa extends Model {}

Masa.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    denumire: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Masa",
    tableName: "masa",
    timestamps: false,
  }
);

module.exports = Masa;
