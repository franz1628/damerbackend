const { DataTypes } = require("sequelize");
const { db } = require("../database/config");
const { Canasta } = require("./canasta");

const MegaCategoria = db.define('MegaCategoria', {
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
    tableName: 'MEGACATEGORIA'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
MegaCategoria.belongsTo(Canasta, { foreignKey: 'codCanasta',defaultValue:0 });

module.exports = {
    MegaCategoria,
    // Otros modelos pueden ser exportados aquí si es necesario
};