const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { TipoEstudio } = require("./tipoEstudio");

const TipoInformeOrden = db.define('TipoInformeOrden', {
    codigo: {type: DataTypes.INTEGER},
    descripcion: {type: DataTypes.STRING},
    descripcionResumida: {type: DataTypes.STRING},
    tip: {type: DataTypes.STRING},
    claseInforme: {type: DataTypes.INTEGER},
    estudios: {type: DataTypes.INTEGER},
    variables: {type: DataTypes.INTEGER}, 
    unidades: {type: DataTypes.INTEGER},
    alias1: {type: DataTypes.STRING},
    alias2: {type: DataTypes.STRING},
    alias3: {type: DataTypes.STRING},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'TIPOINFORMEORDEN'
});



module.exports = { 
    TipoInformeOrden,
    // Otros modelos pueden ser exportados aquí si es necesario
};