const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const TipoTipoCambio = db.define('TipoTipoCambio', {
    descripcion: {type: DataTypes.STRING},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'TIPOTIPOCAMBIO',
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
//TipoTipoCambio.belongsTo(Pais, { foreignKey: 'codPais',defaultValue:1 });

module.exports = {
    TipoTipoCambio,
    // Otros modelos pueden ser exportados aquí si es necesario
};