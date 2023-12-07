const { DataTypes } = require("sequelize");
const { db } = require("../database/config");
const { MegaCategoria } = require("./megaCategoria");

const Categoria = db.define('Categoria', {
    codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
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
    tableName: 'CATEGORIA'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
Categoria.belongsTo(MegaCategoria, { foreignKey: 'codMegaCategoria',defaultValue:0 })

module.exports = {
    Categoria,
    // Otros modelos pueden ser exportados aquí si es necesario
};