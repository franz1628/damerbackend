const { DataTypes } = require("sequelize");
const { db } = require("../database/config");
const { TipoRelevamiento } = require("./tipoRelevamiento");

const Zona = db.define('Zona', {
    codigo: { type: DataTypes.INTEGER, },
    descripcion: { type: DataTypes.STRING, },
    numeroOrden: { type: DataTypes.INTEGER },
    estado: { type: DataTypes.INTEGER, defaultValue: 1, },
    alias1: { type: DataTypes.STRING },
    alias2: { type: DataTypes.STRING },
    alias3: { type: DataTypes.STRING },
    fechaRegistro: { type: DataTypes.DATE }
}, {
    tableName: 'ZONA'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
//Zona.belongsTo(TipoRelevamiento, { foreignKey: 'idTipoRelevamiento',defaultValue:1 });

module.exports = {
    Zona,
    // Otros modelos pueden ser exportados aquí si es necesario
};