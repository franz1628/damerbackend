const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Cliente} = require("../models/cliente");
const {Canal} = require("../models/canal");

const ClienteCanal = db.define('ClienteCanal', {
    codCliente: {type: DataTypes.INTEGER},
    codCanal: {type: DataTypes.INTEGER},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CLIENTE_CANAL'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
//ClienteCanal.belongsTo(Cliente, { foreignKey: 'codCliente'})
ClienteCanal.belongsTo(Canal, { foreignKey: 'codCanal',as:'Canal',targetKey:'codigo'})
ClienteCanal.belongsTo(Cliente, { foreignKey: 'codCliente',as:'Cliente',targetKey:'codigo'})

module.exports = {
    ClienteCanal,
    // Otros modelos pueden ser exportados aquí si es necesario
};