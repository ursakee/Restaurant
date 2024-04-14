const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Comanda_la_Extra extends Model {}

Comanda_la_Extra.init(
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
    id_extra: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comanda_la_Extra",
    tableName: "comanda_la_extra",
    timestamps: false,
  }
);

module.exports = Comanda_la_Extra;
