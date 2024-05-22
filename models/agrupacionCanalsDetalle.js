const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { Canal } = require("./canal");
const { AgrupacionCanals } = require("./agrupacionCanals");
 
const AgrupacionCanalsDetalle = db.define('AgrupacionCanalsDetalle', {
    idAgrupacionCanals : {type: DataTypes.INTEGER},
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
    tableName: 'AGRUPACIONCANALS_DETALLE'
});

AgrupacionCanalsDetalle.belongsTo(Canal, { foreignKey: 'idCanal',as:'Canal',targetKey:'id'})
AgrupacionCanalsDetalle.belongsTo(AgrupacionCanals, { foreignKey: 'idAgrupacionCanals',as:'AgrupacionCanals',targetKey:'id'})
AgrupacionCanals.hasMany(AgrupacionCanalsDetalle,{foreignKey:'id',as:'AgrupacionCanalDetalle',targetKey:'idAgrupacionCanals'});

module.exports = {
    AgrupacionCanalsDetalle,
    // Otros modelos pueden ser exportados aquí si es necesario
};