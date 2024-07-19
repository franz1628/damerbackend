const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Categoria} = require("../models/categoria");
const {Canal} = require("../models/canal");

const MuestraIdeal = db.define('MuestraIdeal', {
    idCategoria: {type: DataTypes.INTEGER},
    idCanal: {type: DataTypes.INTEGER},
    idDistrito: {type: DataTypes.INTEGER},
    valor: {type: DataTypes.INTEGER},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'MUESTRAIDEAL'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
MuestraIdeal.belongsTo(Canal, { foreignKey: 'idCanal',as:'Canal',targetKey:'id'})
MuestraIdeal.belongsTo(Categoria, { foreignKey: 'idCategoria',as:'Categoria',targetKey:'id'})

module.exports = {
    MuestraIdeal,
    // Otros modelos pueden ser exportados aquí si es necesario
};