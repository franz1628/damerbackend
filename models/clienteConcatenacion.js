const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const ClienteConcatenacion = db.define('ClienteConcatenacion', { 
    idAtributoFuncionalVariedadValor : {type:DataTypes.INTEGER},
    idAtributoTecnicoVariedads  : {type:DataTypes.STRING},
    variables  : {type:DataTypes.STRING},

    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    }, 
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CLIENTE_CONCATENACION'
});


module.exports = {
    ClienteConcatenacion,
    // Otros modelos pueden ser exportados aquí si es necesario
};