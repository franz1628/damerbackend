const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { Canasta } = require("./canasta");
const { MegaCategoria } = require("./megaCategoria");
const { Categoria } = require("./categoria");
const { SkuAtributoTecnicoVariedadValor } = require("./skuAtributoTecnicoVariedadValor");
const { SkuHijos } = require("./skuHijos");
const { TipoUnidadMedida } = require("./tipoUnidadMedida");
const { UnidadMedida } = require("./unidadMedida");

const Sku = db.define('Sku', {
    descripcion: {type: DataTypes.STRING},
    tipoSku: {type: DataTypes.INTEGER},
    descripcionResumida: {type: DataTypes.STRING},
    tip: {type: DataTypes.STRING},
    refrigeracion: {type: DataTypes.INTEGER},
    barras: {type: DataTypes.STRING,defaultValue:''},
    alias1: {type: DataTypes.STRING},
    alias2: {type: DataTypes.STRING},
    alias3: {type: DataTypes.STRING},
    medicion: {type: DataTypes.INTEGER},
    image: {type: DataTypes.STRING},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    fechaModificacion:{type : DataTypes.DATE}
    
},{
    tableName: 'SKU',
    hooks: {
        beforeCreate: (model) => {
            if(!model.fechaModificacion){
                model.fechaModificacion = new Date();
            }
            if (model.descripcion) {
                model.descripcion = model.descripcion.toUpperCase();
            }
        },
        beforeUpdate: (model) => {
            model.fechaModificacion = new Date();
            if (model.descripcion) {
                model.descripcion = model.descripcion.toUpperCase();
            }
        }

    }
});




Sku.belongsTo(Canasta, { foreignKey: 'idCanasta',as:'Canasta',targetKey:'id'})
Sku.belongsTo(MegaCategoria, { foreignKey: 'idMegaCategoria',as:'MegaCategoria',targetKey:'id'})
Sku.belongsTo(Categoria, { foreignKey: 'idCategoria',as:'Categoria',targetKey:'id'})
//Sku.belongsTo(TipoUnidadMedida, { foreignKey: 'idTipoUnidadMedida',as:'TipoUnidadMedida',targetKey:'id'})
//Sku.belongsTo(UnidadMedida, { foreignKey: 'idUnidadMedida',as:'UnidadMedida',targetKey:'id'})

Sku.hasMany(SkuAtributoTecnicoVariedadValor, { foreignKey: 'idSku',as:'SkuAtributoTecnicoVariedadValor',targetKey:'id'})
Sku.hasMany(SkuHijos, { foreignKey: 'idSkuPadre',as:'SkuHijos',targetKey:'id'})

SkuAtributoTecnicoVariedadValor.belongsTo(Sku, { foreignKey: 'idSku',as:'Sku',targetKey:'id'})

SkuHijos.belongsTo(Sku, { foreignKey: 'idSku',as:'Sku',targetKey:'id'})
SkuHijos.belongsTo(Sku, { foreignKey: 'idSku',as:'SkuPadre',targetKey:'id'})

module.exports = {
    Sku,
    // Otros modelos pueden ser exportados aquí si es necesario
};