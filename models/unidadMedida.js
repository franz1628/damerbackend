const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { TipoUnidadMedida } = require("./tipoUnidadMedida");

const UnidadMedida = db.define('UnidadMedida', {
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
    tableName: 'UNIDADMEDIDA',
    hooks: {
        beforeCreate: (model) => {
            if (model.descripcion) {
                model.descripcion = model.descripcion.toUpperCase();
            }
        },
        beforeUpdate: (model) => {
            if (model.descripcion) {
                model.descripcion = model.descripcion.toUpperCase();
            }
        }

    }
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
UnidadMedida.belongsTo(TipoUnidadMedida, { foreignKey: 'idTipoUnidadMedida', as: 'TipoUnidadMedida', targetKey: 'id' })

module.exports = {
    UnidadMedida,
    // Otros modelos pueden ser exportados aquí si es necesario
};