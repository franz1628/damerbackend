const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Contrato} = require("./contrato");


const ContratoHistorial = db.define('ContratoHistorial', {
    idContrato: {type: DataTypes.INTEGER},
    idEstadoContrato: {type: DataTypes.INTEGER},
    motivo: {type: DataTypes.STRING},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CONTRATO_HISTORIAL'
});

ContratoHistorial.belongsTo(Contrato, { foreignKey: 'idContrato',as:'Contrato',targetKey:'id'})


module.exports = {
    ContratoHistorial,
    // Otros modelos pueden ser exportados aquí si es necesario
};