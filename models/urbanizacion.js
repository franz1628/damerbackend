const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { Distrito } = require("./distrito");

const Urbanizacion = db.define('Urbanizacion', {
    descripcion: { type: DataTypes.STRING, },
    idDistrito: { type: DataTypes.INTEGER, },
    estado: { type: DataTypes.INTEGER, },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    tableName: 'URBANIZACION'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
Urbanizacion.belongsTo(Distrito, { foreignKey: 'idDistrito',defaultValue:1 });

module.exports = {
    Urbanizacion,
    // Otros modelos pueden ser exportados aquí si es necesario
};