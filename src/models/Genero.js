const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Genero = sequelize.define("Genero", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  descripcion: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true
});

module.exports = Genero;