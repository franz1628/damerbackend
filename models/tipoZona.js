const { DataTypes } = require("sequelize");
const { db } = require("../database/config");
const { TipoRelevamiento } = require("./tipoRelevamiento");

const TipoZona = db.define('TipoZona', {
    descripcion: { type: DataTypes.STRING, },
    estado: { type: DataTypes.INTEGER, defaultValue: 1, },
    fechaRegistro: { type: DataTypes.DATE }
}, {
    tableName: 'TIPOZONA'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
//Zona.belongsTo(TipoRelevamiento, { foreignKey: 'idTipoRelevamiento',defaultValue:1 });

module.exports = {
    TipoZona,
    // Otros modelos pueden ser exportados aquí si es necesario
};