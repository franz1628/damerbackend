const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const { AtributoTecnicoVariedadValor } = require("./atributoTecnicoVariedadValor");
const { AtributoFuncionalVariedadValor } = require("./atributoFuncionalVariedadValor");

const AtributoFuncionalVariedadValorValor = db.define('AtributoFuncionalVariedadValorValor', {
    idAtributoFuncionalVariedadValor :  {type: DataTypes.INTEGER},
    idAtributoTecnicoVariedadValor :  {type: DataTypes.INTEGER},
    estado: { 
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE
    }
},{
    tableName: 'ATRIBUTOFUNCIONALVARIEDAD_VALORVALOR'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
AtributoFuncionalVariedadValorValor.belongsTo(AtributoFuncionalVariedadValor, { foreignKey: 'idAtributoFuncionalVariedadValor',as:'AtributoFuncionalVariedadValor',targetKey:'id'})

AtributoFuncionalVariedadValorValor.belongsTo(AtributoTecnicoVariedadValor, { foreignKey: 'idAtributoTecnicoVariedadValor',as:'AtributoTecnicoVariedadValor',targetKey:'id'})

module.exports = {
    AtributoFuncionalVariedadValorValor,
    // Otros modelos pueden ser exportados aquí si es necesario
};
