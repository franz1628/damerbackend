const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Contrato} = require("./contrato");


const ContratoMes = db.define('ContratoMes', {
    idContrato: {type: DataTypes.INTEGER},
    mes: {type: DataTypes.DATE},

    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CONTRATO_MES'
});

ContratoMes.belongsTo(Contrato, { foreignKey: 'idContrato',as:'Contrato',targetKey:'id'})


module.exports = {
    ContratoMes,
    // Otros modelos pueden ser exportados aquí si es necesario
};