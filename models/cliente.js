const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const Cliente = db.define('Cliente', {
    codigo: {type: DataTypes.INTEGER},
    idPais: {type: DataTypes.INTEGER},
    razonSocial: {type: DataTypes.STRING},
    razonSocialAbreviada: {type: DataTypes.STRING},
    razonSocialTip: {type: DataTypes.STRING},
    ruc: {type: DataTypes.STRING},
    razonSocialCorporativa: {type: DataTypes.STRING},
    codigoRubro: {type: DataTypes.STRING},
    idCategorizacionCliente: {type: DataTypes.INTEGER},
    aniversario: Date,
    web: {type: DataTypes.STRING},
    mesCierre: {type: DataTypes.INTEGER},
    alias1: {type: DataTypes.STRING},
    alias2: {type: DataTypes.STRING},
    alias3: {type: DataTypes.STRING},

    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CLIENTE',
    hooks: {
        beforeCreate: (model) => {
            if (model.razonSocial) {
                model.razonSocial = model.razonSocial.toUpperCase();
            }
        },
        beforeUpdate: (model) => {
            if (model.razonSocial) {
                model.razonSocial = model.razonSocial.toUpperCase();
            }
        }

    }
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
// Cliente.belongsTo(MegaCliente, { foreignKey: 'codMegaCliente',defaultValue:0 })

module.exports = {
    Cliente,
    // Otros modelos pueden ser exportados aquí si es necesario
};