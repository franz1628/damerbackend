const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const TipoMoneda = db.define('TipoMoneda', {
    idMoneda: {type: DataTypes.INTEGER},
    idTipoTipoMoneda: {type: DataTypes.INTEGER},
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
    tableName: 'TIPOMONEDA'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
//TipoMoneda.belongsTo(Pais, { foreignKey: 'codPais',defaultValue:1 });

module.exports = {
    TipoMoneda,
    // Otros modelos pueden ser exportados aquí si es necesario
};