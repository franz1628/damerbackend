const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Cliente} = require("../models/cliente");
const {Zona} = require("../models/zona");

const ClienteZona = db.define('ClienteZona', {
    idCliente: {type: DataTypes.INTEGER},
    idZona: {type: DataTypes.INTEGER},
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
    tableName: 'CLIENTE_ZONA'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
ClienteZona.belongsTo(Zona, { foreignKey: 'idZona',as:'Zona',targetKey:'id'})
ClienteZona.belongsTo(Cliente, { foreignKey: 'idCliente',as:'Cliente',targetKey:'id'})

module.exports = {
    ClienteZona,
    // Otros modelos pueden ser exportados aquí si es necesario
};