const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Contrato} = require("./contrato");
const {Variable} = require("./variable");


const ContratoVariable = db.define('ContratoVariable', {
    idContrato: {type: DataTypes.INTEGER},
    idVariable: {type: DataTypes.INTEGER},

    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CONTRATO_VARIABLE'
});

ContratoVariable.belongsTo(Contrato, { foreignKey: 'idContrato',as:'Contrato',targetKey:'id'})
ContratoVariable.belongsTo(Variable, { foreignKey: 'idVariable',as:'Variable',targetKey:'id'})


module.exports = {
    ContratoVariable,
    // Otros modelos pueden ser exportados aquí si es necesario
};