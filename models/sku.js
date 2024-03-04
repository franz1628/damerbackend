const { DataTypes } = require("sequelize");
const { db } = require("../database/config");
const { Canasta } = require("./canasta");
const { MegaCategoria } = require("./megaCategoria");
const { Categoria } = require("./categoria");

const Sku = db.define('Sku', {
    descripcion: {type: DataTypes.STRING},
    descripcionResumida: {type: DataTypes.STRING},
    tip: {type: DataTypes.STRING},
    alias1: {type: DataTypes.STRING},
    alias2: {type: DataTypes.STRING},
    alias3: {type: DataTypes.STRING},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE
    }
},{
    tableName: 'SKU'
});



Sku.belongsTo(Canasta, { foreignKey: 'idCanasta',as:'Canasta',targetKey:'id'})
Sku.belongsTo(MegaCategoria, { foreignKey: 'idMegaCategoria',as:'MegaCategoria',targetKey:'id'})
Sku.belongsTo(Categoria, { foreignKey: 'idCategoria',as:'Categoria',targetKey:'id'})

module.exports = {
    Sku,
    // Otros modelos pueden ser exportados aquí si es necesario
};