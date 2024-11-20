const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const TipoMoneda = db.define('TipoMoneda', {
    descripcion :  {type: DataTypes.STRING},
    descripcionResumida :  {type: DataTypes.STRING},
    tip :  {type: DataTypes.STRING},
    simbolo :  {type: DataTypes.STRING},
    alias :  {type: DataTypes.STRING},

    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'TIPOMONEDA',
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
    TipoMoneda, 
    // Otros modelos pueden ser exportados aquí si es necesario
};