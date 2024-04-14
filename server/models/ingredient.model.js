const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Ingredient extends Model {}

Ingredient.init(
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
    pret: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Ingredient",
    tableName: "ingredient",
    timestamps: false,
  }
);

module.exports = Ingredient;
