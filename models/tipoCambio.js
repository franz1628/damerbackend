const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Moneda} = require("../models/moneda");
const {TipoTipoCambio} = require("../models/tipoTipoCambio");

const TipoCambio = db.define('TipoCambio', {
    idMoneda: {type: DataTypes.INTEGER},
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

TipoCambio.belongsTo(Moneda, { foreignKey: 'idMoneda',as:'Moneda',targetKey:'id'})
TipoCambio.belongsTo(TipoTipoCambio, { foreignKey: 'idTipoTipoCambio',as:'TipoTipoCambio',targetKey:'id'})

module.exports = {
    TipoCambio,
    // Otros modelos pueden ser exportados aquí si es necesario
};