const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Mancare extends Model {}

Mancare.init(
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
    imagine: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    id_categorie: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vegetarian: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    picant: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    calorii: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gramaj: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activ: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Mancare",
    tableName: "mancare",
    timestamps: false,
  }
);

module.exports = Mancare;
