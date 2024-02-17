const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Contrato} = require("./contrato");
const {UnidadVenta} = require("./unidadVenta");


const ContratoUnidadVenta = db.define('ContratoUnidadVenta', {
    idContrato: {type: DataTypes.INTEGER},
    idUnidadVenta: {type: DataTypes.INTEGER},

    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CONTRATO_UNIDADVENTA'
});

ContratoUnidadVenta.belongsTo(Contrato, { foreignKey: 'idContrato',as:'Contrato',targetKey:'id'})
ContratoUnidadVenta.belongsTo(UnidadVenta, { foreignKey: 'idUnidadVenta',as:'UnidadVenta',targetKey:'id'})


module.exports = {
    ContratoUnidadVenta,
    // Otros modelos pueden ser exportados aquí si es necesario
};