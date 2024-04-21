const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { MegaCategoria } = require("./megaCategoria");
const { Canasta } = require("./canasta");

const Categoria = db.define('Categoria', {
    descripcion: {type: DataTypes.STRING},
    descripcionResumida: {type: DataTypes.STRING},
    tip: {type: DataTypes.STRING},
    idMegaCategoria: {type: DataTypes.INTEGER},
    idCanasta: {type: DataTypes.INTEGER},
    alias1: {type: DataTypes.STRING},
    alias2: {type: DataTypes.STRING},
    alias3: {type: DataTypes.STRING},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CATEGORIA'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
Categoria.belongsTo(MegaCategoria, { foreignKey: 'idMegaCategoria',defaultValue:0 })
Categoria.belongsTo(Canasta, { foreignKey: 'idCanasta',defaultValue:0 })

module.exports = {
    Categoria,
    // Otros modelos pueden ser exportados aquí si es necesario
};