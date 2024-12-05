const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const ClienteContacto = db.define('ClienteContacto', {
    idCliente: {type: DataTypes.INTEGER},
    nombreCompleto: {type: DataTypes.INTEGER},
    cargo: {type: DataTypes.STRING},
    correo: {type: DataTypes.INTEGER},
    telefono: {type: DataTypes.INTEGER},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CLIENTE_CONTACTO',
    hooks: {
        beforeCreate: (model) => {
            if (model.nombreCompleto) {
                model.nombreCompleto = model.nombreCompleto.toUpperCase();
            }
        },
        beforeUpdate: (model) => {
            if (model.nombreCompleto) {
                model.nombreCompleto = model.nombreCompleto.toUpperCase();
            }
        }

    }
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
// Cliente.belongsTo(MegaCliente, { foreignKey: 'codMegaCliente',defaultValue:0 })

module.exports = {
    ClienteContacto,
    // Otros modelos pueden ser exportados aquí si es necesario
};