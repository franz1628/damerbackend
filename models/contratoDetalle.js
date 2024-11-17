const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const ContratoDetalle = db.define('ContratoDetalle', {
    idContrato: {type: DataTypes.INTEGER},
    idTipoEstudio: {type: DataTypes.INTEGER},
    idAgrupacionZona: {type: DataTypes.INTEGER},
    idAgrupacionCanal: {type: DataTypes.INTEGER},
    idTipoInforme: {type: DataTypes.INTEGER},
    idAtributoFuncionalVariedad: {type: DataTypes.INTEGER},
    valor: {type: DataTypes.INTEGER},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CONTRATO_DETALLE'
});

module.exports = {
    ContratoDetalle,
    // Otros modelos pueden ser exportados aquí si es necesario
};