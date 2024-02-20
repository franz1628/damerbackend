const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Cliente} = require("./cliente");
const {Categoria} = require("./categoria");
const { EstadoContrato } = require("./estadoContrato");
const { Frecuencia } = require("./frecuencia");
const { DateTime } = require("luxon");

const Contrato = db.define('Contrato', {
    idCliente: {type: DataTypes.INTEGER},
    idCategoria: {type: DataTypes.INTEGER},
    fechaInicio: {type: DataTypes.DATE},
    fechaFin: {type: DataTypes.DATE},
    diaEntrega: {type: DataTypes.STRING},
    shot: {type: DataTypes.INTEGER},
    extension: {type: DataTypes.INTEGER},
    version: {type: DataTypes.INTEGER},
    fechaAprobacion: {type: DataTypes.DATE},
    fechaModificacion: {type: DataTypes.DATE},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CONTRATO'
});


Contrato.belongsTo(Categoria, { foreignKey: 'idCategoria',as:'Categoria',targetKey:'id'})
Contrato.belongsTo(Cliente, { foreignKey: 'idCliente',as:'Cliente',targetKey:'id'})
Contrato.belongsTo(EstadoContrato, { foreignKey: 'idEstadoContrato',as:'EstadoContrato',targetKey:'id'})
Contrato.belongsTo(Frecuencia, { foreignKey: 'idFrecuencia',as:'Frecuencia',targetKey:'id'})


module.exports = {
    Contrato,
    // Otros modelos pueden ser exportados aquí si es necesario
};