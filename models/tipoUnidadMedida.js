const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const TipoUnidadMedida = db.define('TipoUnidadMedida', {
    codigo: { type: DataTypes.INTEGER },
    descripcion: { type: DataTypes.STRING },
    descripcionResumida: { type: DataTypes.STRING },
    tip: { type: DataTypes.STRING },
    memo: { type: DataTypes.STRING },
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    tableName: 'TIPOUNIDADMEDIDA',
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

module.exports = {
    TipoUnidadMedida,
    // Otros modelos pueden ser exportados aquí si es necesario
};