const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Cliente} = require("../models/cliente");
const {Categoria} = require("../models/categoria");

const ClienteCategoria = db.define('ClienteCategoria', {
    idCliente: {type: DataTypes.INTEGER},
    codCategoria: {type: DataTypes.INTEGER},
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
    tableName: 'CLIENTE_CATEGORIA'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)

ClienteCategoria.belongsTo(Categoria, { foreignKey: 'idCategoria',as:'Categoria',targetKey:'id'})
ClienteCategoria.belongsTo(Cliente, { foreignKey: 'idCliente',as:'Cliente',targetKey:'id'})

module.exports = {
    ClienteCategoria,
    // Otros modelos pueden ser exportados aquí si es necesario
};