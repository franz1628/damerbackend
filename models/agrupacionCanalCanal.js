const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { Canal } = require("./canal");

const AgrupacionCanalCanal = db.define('AgrupacionCanalCanal', {
    idClienteAgrupacionCanal: {type: DataTypes.INTEGER},
    idCanal: {type: DataTypes.INTEGER},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'AGRUPACIONCANAL_CANAL'
});

AgrupacionCanalCanal.belongsTo(Canal,{foreignKey:'idCanal',as:'Canal',targetKey:'id'});

// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)

module.exports = {
    AgrupacionCanalCanal,
    // Otros modelos pueden ser exportados aquí si es necesario
};