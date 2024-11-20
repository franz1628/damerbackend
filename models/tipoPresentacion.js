const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
// const { TipoInformeOrden } = require("./tipoInformeOrden");


const TipoPresentacion = db.define('TipoPresentacion', {
    descripcion :  {type: DataTypes.STRING},
    descripcionResumida :  {type: DataTypes.STRING},
    tip :  {type: DataTypes.STRING},
    indicador :  {type: DataTypes.INTEGER},

    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'TIPOPRESENTACION',
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
    TipoPresentacion, 
    // Otros modelos pueden ser exportados aquí si es necesario
};