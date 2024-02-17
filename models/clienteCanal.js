const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Cliente} = require("../models/cliente");
const {Canal} = require("../models/canal");

const ClienteCanal = db.define('ClienteCanal', {
    codCliente: {type: DataTypes.INTEGER},
    codCanal: {type: DataTypes.INTEGER},
    nombreAgrupacion: {type: DataTypes.STRING},
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
ClienteCanal.belongsTo(Canal, { foreignKey: 'idCanal',as:'Canal',targetKey:'id'})
ClienteCanal.belongsTo(Cliente, { foreignKey: 'idCliente',as:'Cliente',targetKey:'id'})

module.exports = {
    ClienteCanal,
    // Otros modelos pueden ser exportados aquí si es necesario
};