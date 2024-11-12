const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {AgrupacionCanalCanal} = require("../models/agrupacionCanalCanal")

const ClienteAgrupacionCanal = db.define('ClienteAgrupacionCanal', {
    idCliente: {type: DataTypes.INTEGER},
    nombre: {type: DataTypes.STRING},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CLIENTE_AGRUPACIONCANAL',
    hooks: {
        beforeCreate: (model) => {
            if (model.nombre) {
                model.nombre = model.nombre.toUpperCase();
            }
        },
        beforeUpdate: (model) => {
            if (model.nombre) {
                model.nombre = model.nombre.toUpperCase();
            }
        }

    }
});

ClienteAgrupacionCanal.hasMany(AgrupacionCanalCanal,{foreignKey:'idClienteAgrupacionCanal',as:'AgrupacionCanalCanal',targetKey:'id'});


module.exports = {
    ClienteAgrupacionCanal,
    // Otros modelos pueden ser exportados aquí si es necesario
};