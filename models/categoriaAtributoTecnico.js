const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { AtributoTecnicoVariedad } = require("./atributoTecnicoVariedad");

const CategoriaAtributoTecnico = db.define('CategoriaAtributoTecnico', {
	codigo : {type:DataTypes.INTEGER} ,
	codCategoria : {type:DataTypes.INTEGER},
	comentario : {type:DataTypes.STRING} ,
	idTipoUnidadMedida : {type:DataTypes.INTEGER} ,
	numOrdenSku : {type:DataTypes.STRING} ,
	indVerificado : {type:DataTypes.INTEGER} ,
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CATEGORIA_ATRIBUTOTECNICO'
});

CategoriaAtributoTecnico.belongsTo(AtributoTecnicoVariedad, { foreignKey: 'codAtributoTecnicoVariedad'})
// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)

module.exports = {
    CategoriaAtributoTecnico,
    // Otros modelos pueden ser exportados aquí si es necesario
};