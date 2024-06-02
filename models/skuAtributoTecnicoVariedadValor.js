const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const { TipoUnidadMedida } = require("./tipoUnidadMedida");
const { UnidadMedida } = require("./unidadMedida");
const { AtributoTecnicoVariedad } = require("./atributoTecnicoVariedad");
const { AtributoTecnicoVariedadValor } = require("./atributoTecnicoVariedadValor");
const { CategoriaAtributoTecnico } = require("./categoriaAtributoTecnico");
const { Sku } = require("./sku");

const SkuAtributoTecnicoVariedadValor = db.define('SkuAtributoTecnicoVariedadValor', {
    comentario: {type: DataTypes.STRING},
    alias1: {type: DataTypes.STRING},
    alias2: {type: DataTypes.STRING},
    alias3: {type: DataTypes.STRING},
    valor: {type: DataTypes.STRING},
    estado: { 
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE
    }
},{
    tableName: 'SKU_ATRIBUTOTECNICOVARIEDADVALOR'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
SkuAtributoTecnicoVariedadValor.belongsTo(AtributoTecnicoVariedad, { foreignKey: 'idAtributoTecnicoVariedad',as:'AtributoTecnicoVariedad',targetKey:'id'})
SkuAtributoTecnicoVariedadValor.belongsTo(AtributoTecnicoVariedadValor, { foreignKey: 'idAtributoTecnicoVariedadValor',as:'AtributoTecnicoVariedadValor',targetKey:'id'})
SkuAtributoTecnicoVariedadValor.belongsTo(TipoUnidadMedida, { foreignKey: 'idTipoUnidadMedida',as:'TipoUnidadMedida',targetKey:'id'})
SkuAtributoTecnicoVariedadValor.belongsTo(UnidadMedida, { foreignKey: 'idUnidadMedida',as:'UnidadMedida',targetKey:'id'})
SkuAtributoTecnicoVariedadValor.belongsTo(CategoriaAtributoTecnico, { foreignKey: 'idCategoriaAtributoTecnico',as:'CategoriaAtributoTecnico',targetKey:'id'})

module.exports = {
    SkuAtributoTecnicoVariedadValor,
    // Otros modelos pueden ser exportados aquí si es necesario
};

