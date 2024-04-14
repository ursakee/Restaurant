const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Comanda extends Model {}

Comanda.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_masa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pret_total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    bacsis: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Comanda",
    tableName: "comanda",
    timestamps: false,
  }
);

module.exports = Comanda;
