const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { Usuario } = require("./usuario");

const Cliente = db.define('Cliente', {
    area: {type: DataTypes.STRING},
    codigo: {type: DataTypes.INTEGER},
    idPais: {type: DataTypes.INTEGER},
    idUsuario: {type: DataTypes.INTEGER},
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
    },
    fechaModificacion: {
        type: DataTypes.DATE,
    }
},{
    tableName: 'CLIENTE',
    hooks: {
        beforeCreate: (model) => {
            if(!model.fechaModificacion){
                model.fechaModificacion = new Date();
            }
            if (model.razonSocial) {
                model.razonSocial = model.razonSocial.toUpperCase();
            }
        },
        beforeUpdate: (model) => {
            model.fechaModificacion = new Date();
            if (model.razonSocial) {
                model.razonSocial = model.razonSocial.toUpperCase();
            }
        }

    }
});

Cliente.belongsTo(Usuario, { foreignKey: 'idUsuario',as:'Usuario',targetKey:'id'})

// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
// Cliente.belongsTo(MegaCliente, { foreignKey: 'codMegaCliente',defaultValue:0 })

module.exports = {
    Cliente,
    // Otros modelos pueden ser exportados aquí si es necesario
};