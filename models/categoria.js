const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { MegaCategoria } = require("./megaCategoria");
const { Canasta } = require("./canasta");
const { TipoCategoria } = require("./tipoCategoria");

const Categoria = db.define('Categoria', {
    descripcion: {type: DataTypes.STRING},
    descripcionResumida: {type: DataTypes.STRING},
    tip: {type: DataTypes.STRING},
    idMegaCategoria: {type: DataTypes.INTEGER},
    idCanasta: {type: DataTypes.INTEGER},
    idTipoCategoria: {type: DataTypes.INTEGER},
    idCategorias: {type: DataTypes.STRING},
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
    },
    fechaModificacion: {type: DataTypes.DATE},
},{
    tableName: 'CATEGORIA',
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


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
Categoria.belongsTo(MegaCategoria, { foreignKey: 'idMegaCategoria',defaultValue:0 })
Categoria.belongsTo(Canasta, { foreignKey: 'idCanasta',defaultValue:0 })
Categoria.belongsTo(TipoCategoria, { foreignKey: 'idTipoCategoria',as:'TipoCategoria',targetKey:'id'})

module.exports = {
    Categoria,
    // Otros modelos pueden ser exportados aquí si es necesario
};