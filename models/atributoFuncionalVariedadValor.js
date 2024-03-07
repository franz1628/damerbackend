const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const { AtributoFuncionalVariedad } = require("./atributoFuncionalVariedad");

const AtributoFuncionalVariedadValor = db.define('AtributoFuncionalVariedadValor', {
    idAtributoFuncionalVariedad :  {type: DataTypes.INTEGER},
    descripcion :  {type: DataTypes.STRING},
    alerta : {type: DataTypes.INTEGER},
    idTipoAtributoFuncionalVariedadValor : {type: DataTypes.INTEGER},
    condicion : {type: DataTypes.STRING},
    formula : {type: DataTypes.STRING},
    nSkus : {type: DataTypes.INTEGER},
    estado: { 
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE
    }
},{
    tableName: 'ATRIBUTOFUNCIONALVARIEDAD_VALOR'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
AtributoFuncionalVariedadValor.belongsTo(AtributoFuncionalVariedad, { foreignKey: 'idAtributoFuncionalVariedad',as:'AtributoFuncionalVariedad',targetKey:'id'})


module.exports = {
    AtributoFuncionalVariedadValor,
    // Otros modelos pueden ser exportados aquí si es necesario
};
