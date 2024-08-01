const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Cliente} = require("../models/cliente");
const {Canal} = require("../models/canal");

const ClienteCanal = db.define('ClienteCanal', {
    idCliente: {type: DataTypes.INTEGER},
    idCanal: {type: DataTypes.INTEGER},
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
    tableName: 'CLIENTE_CANAL',
    hooks: {
        beforeCreate: (model) => {
            if (model.nombreAgrupacion) {
                model.nombreAgrupacion = model.nombreAgrupacion.toUpperCase();
            }
        },
        beforeUpdate: (model) => {
            if (model.nombreAgrupacion) {
                model.nombreAgrupacion = model.nombreAgrupacion.toUpperCase();
            }
        }

    }
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)

ClienteCanal.belongsTo(Canal, { foreignKey: 'idCanal',as:'Canal',targetKey:'id'})
ClienteCanal.belongsTo(Cliente, { foreignKey: 'idCliente',as:'Cliente',targetKey:'id'})

module.exports = {
    ClienteCanal,
    // Otros modelos pueden ser exportados aquí si es necesario
};