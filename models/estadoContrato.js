const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const EstadoContrato = db.define('EstadoContrato', {
    descripcion: {type: DataTypes.INTEGER},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'ESTADOCONTRATO',
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



module.exports = {
    EstadoContrato,
    // Otros modelos pueden ser exportados aquí si es necesario
};