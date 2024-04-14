const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Categorie extends Model {}

Categorie.init(
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
    modelName: "Categorie",
    tableName: "categorie",
    timestamps: false,
  }
);

module.exports = Categorie;
