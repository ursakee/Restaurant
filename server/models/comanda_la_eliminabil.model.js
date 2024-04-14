const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Comanda_la_Eliminabil extends Model {}

Comanda_la_Eliminabil.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_mancare_la_comanda: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_eliminabil: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comanda_la_Eliminabil",
    tableName: "comanda_la_eliminabil",
    timestamps: false,
  }
);

module.exports = Comanda_la_Eliminabil;
