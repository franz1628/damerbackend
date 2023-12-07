const { DataTypes } = require("sequelize");
const { db } = require("../database/config");
const { Distrito } = require("./distrito");

const Urbanizacion = db.define('Urbanizacion', {
    codigo: { type: DataTypes.INTEGER, },
    descripcion: { type: DataTypes.STRING, },
    estado: { type: DataTypes.INTEGER, },
    fechaRegistro: { type: DataTypes.DATE }
}, {
    tableName: 'URBANIZACION'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
Urbanizacion.belongsTo(Distrito, { foreignKey: 'idDistrito',defaultValue:1 });

module.exports = {
    Urbanizacion,
    // Otros modelos pueden ser exportados aquí si es necesario
};