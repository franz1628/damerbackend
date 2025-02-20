const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { AtributoTecnicoVariedad } = require("./atributoTecnicoVariedad");
const { CategoriaAtributoTecnicoValor } = require("./categoriaAtributoTecnicoValor");
const { Categoria } = require("./categoria");
const { TipoUnidadMedida } = require("./tipoUnidadMedida");

const CategoriaAtributoTecnico = db.define('CategoriaAtributoTecnico', {
	idCategoria : {type:DataTypes.INTEGER},
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
    tableName: 'CATEGORIA_ATRIBUTOTECNICO',
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


Categoria.hasMany(CategoriaAtributoTecnico,{foreignKey:'idCategoria',as:'CategoriaAtributoTecnico',targetKey:'id'});

CategoriaAtributoTecnico.hasMany(CategoriaAtributoTecnicoValor,{foreignKey:'idCategoriaAtributoTecnico',as:'CategoriaAtributoTecnicoValor',targetKey:'id'});


CategoriaAtributoTecnico.belongsTo(AtributoTecnicoVariedad, { foreignKey: 'idAtributoTecnicoVariedad',as:'AtributoTecnicoVariedad',targetKey:'id'})

CategoriaAtributoTecnicoValor.belongsTo(CategoriaAtributoTecnico, { foreignKey: 'idCategoriaAtributoTecnico',as:'CategoriaAtributoTecnico',targetKey:'id'})
CategoriaAtributoTecnico.belongsTo(Categoria, { foreignKey: 'idCategoria',as:'Categoria',targetKey:'id'}) 

CategoriaAtributoTecnico.belongsTo(TipoUnidadMedida, { foreignKey: 'idTipoUnidadMedida',as:'TipoUnidadMedida',targetKey:'id'})


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)

module.exports = {
    CategoriaAtributoTecnico,
    // Otros modelos pueden ser exportados aquí si es necesario
};