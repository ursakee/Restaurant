const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Reteta extends Model {}

Reteta.init(
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
    id_ingredient: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    necesar: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    extra: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    eliminabil: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Reteta",
    tableName: "reteta",
    timestamps: false,
  }
);

module.exports = Reteta;
