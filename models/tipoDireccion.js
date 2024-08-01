const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const TipoDireccion = db.define('TipoDireccion', {
    descripcion: {type: DataTypes.STRING},
    descripcionResumida: {type: DataTypes.STRING},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'TIPODIRECCION',
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
// Cliente.belongsTo(MegaCliente, { foreignKey: 'codMegaCliente',defaultValue:0 })

module.exports = {
    TipoDireccion,
    // Otros modelos pueden ser exportados aquí si es necesario
};