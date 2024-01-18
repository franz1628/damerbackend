const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Cliente} = require("../models/cliente");

const ClienteDireccion = db.define('ClienteDireccion', {
    idTipoDireccion: {type: DataTypes.INTEGER},
    codDistrito: {type: DataTypes.INTEGER},
    codUrbanizacion: {type: DataTypes.INTEGER},
    codVia: {type: DataTypes.INTEGER},
    numDomicilio: {type: DataTypes.INTEGER},
    interior: {type: DataTypes.INTEGER},
    manzana: {type: DataTypes.STRING},
    lote: {type: DataTypes.STRING},
    referencia: {type: DataTypes.TEXT},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CLIENTE_DIRECCION'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
ClienteDireccion.belongsTo(Cliente, { foreignKey: 'codCliente'})

module.exports = {
    ClienteDireccion,
    // Otros modelos pueden ser exportados aquí si es necesario
};