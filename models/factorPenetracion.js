const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Categoria} = require("../models/categoria");
const {Canal} = require("../models/canal");
const {Zona} = require("../models/zona");
const {Medicion} = require("../models/medicion");

const FactorPenetracion = db.define('FactorPenetracion', {
    idZona: {type: DataTypes.INTEGER},
    idCanal: {type: DataTypes.INTEGER},
    idCategoria: {type: DataTypes.INTEGER},
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
    tableName: 'FACTORPENETRACION'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)

FactorPenetracion.belongsTo(Zona, { foreignKey: 'idZona',as:'Zona',targetKey:'id'})
FactorPenetracion.belongsTo(Canal, { foreignKey: 'idCanal',as:'Canal',targetKey:'id'})
FactorPenetracion.belongsTo(Categoria, { foreignKey: 'idCategoria',as:'Categoria',targetKey:'id'})
FactorPenetracion.belongsTo(Medicion, { foreignKey: 'idMedicion',as:'Medicion',targetKey:'id'})

module.exports = {
    FactorPenetracion,
    // Otros modelos pueden ser exportados aquí si es necesario
};