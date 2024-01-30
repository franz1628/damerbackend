const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { TipoUnidadMedida } = require("./tipoUnidadMedida");

const UnidadMedida = db.define('UnidadMedida', {

    codigo: { type: DataTypes.INTEGER },
    descripcion: { type: DataTypes.STRING },
    descripcionResumida: { type: DataTypes.STRING },
    tip: { type: DataTypes.STRING },
    unidadMetrica: { type: DataTypes.INTEGER },
    factorConversion: { type: DataTypes.STRING },
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    tableName: 'UNIDADMEDIDA'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
//UnidadMedida.belongsTo(Cliente, { foreignKey: 'codCliente'})
UnidadMedida.belongsTo(TipoUnidadMedida, { foreignKey: 'codTipoUnidadMedida', as: 'TipoUnidadMedida', targetKey: 'codigo' })

module.exports = {
    UnidadMedida,
    // Otros modelos pueden ser exportados aquí si es necesario
};