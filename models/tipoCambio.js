const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {TipoMoneda} = require("../models/tipoMoneda");
const {TipoTipoCambio} = require("../models/tipoTipoCambio");

const TipoCambio = db.define('TipoCambio', {
    idTipoMoneda: {type: DataTypes.INTEGER},
    idTipoTipoCambio: {type: DataTypes.INTEGER},
    valor: {type: DataTypes.INTEGER},
    fecha: {type: DataTypes.INTEGER},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'TIPOCAMBIO'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)

TipoCambio.belongsTo(TipoMoneda, { foreignKey: 'idTipoMoneda',as:'TipoMoneda',targetKey:'id'})
TipoCambio.belongsTo(TipoTipoCambio, { foreignKey: 'idTipoTipoCambio',as:'TipoTipoCambio',targetKey:'id'})

module.exports = {
    TipoCambio,
    // Otros modelos pueden ser exportados aquí si es necesario
};