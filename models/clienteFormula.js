const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const ClienteFormula = db.define('ClienteFormula', { 
    idAtributoFuncionalVariedadValor : {type:DataTypes.INTEGER},
    idAtributoTecnicoVariedad : {type:DataTypes.INTEGER},
    idAtributoTecnicoVariedadValors  : {type:DataTypes.STRING},


    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    }, 
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CLIENTE_FORMULA'
});


module.exports = {
    ClienteFormula,
    // Otros modelos pueden ser exportados aquí si es necesario
};