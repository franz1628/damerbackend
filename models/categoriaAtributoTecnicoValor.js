const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { CategoriaAtributoTecnico } = require("./categoriaAtributoTecnico");

const CategoriaAtributoTecnicoValor = db.define('CategoriaAtributoTecnicoValor', {
	comentario : {type:DataTypes.STRING} ,
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CATEGORIA_ATRIBUTOTECNICOVALOR'
});

CategoriaAtributoTecnicoValor.belongsTo(CategoriaAtributoTecnico, { foreignKey: 'idCategoriaAtributoTecnico'})
// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)

module.exports = {
    CategoriaAtributoTecnicoValor,
    // Otros modelos pueden ser exportados aquí si es necesario
};