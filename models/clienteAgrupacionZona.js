const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {AgrupacionZonas} = require("../models/agrupacionZonas")

const ClienteAgrupacionZona = db.define('ClienteAgrupacionZona', {
    idCliente: {type: DataTypes.INTEGER},
    idAgrupacionZona: {type: DataTypes.INTEGER},
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
    tableName: 'CLIENTE_AGRUPACIONZONA',
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

ClienteAgrupacionZona.belongsTo(AgrupacionZonas, { foreignKey: 'idAgrupacionZona',as:'AgrupacionZonas',targetKey:'id'})


module.exports = {
    ClienteAgrupacionZona,
    // Otros modelos pueden ser exportados aquí si es necesario
};