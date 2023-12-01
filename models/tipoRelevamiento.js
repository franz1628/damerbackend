const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const TipoRelevamiento = db.define('tipoRelevamiento', {
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    }
},{
    tableName: 'TIPORELEVAMIENTO'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
// Usuario.belongsTo(TipoDocumento, { foreignKey: 'idTipoDocumento' });

module.exports = {
    TipoRelevamiento,
    // Otros modelos pueden ser exportados aquí si es necesario
};