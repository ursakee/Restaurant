const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Mancare_la_Comanda extends Model {}

Mancare_la_Comanda.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_mancare: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_comanda: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantitate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Mancare_la_Comanda",
    tableName: "mancare_la_comanda",
    timestamps: false,
  }
);

module.exports = Mancare_la_Comanda;
