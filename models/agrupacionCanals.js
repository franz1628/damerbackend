const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

 
const AgrupacionCanals = db.define('AgrupacionCanals', {
    descripcion: {type: DataTypes.STRING},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'AGRUPACIONCANALS'
});

module.exports = {
    AgrupacionCanals,
    // Otros modelos pueden ser exportados aquí si es necesario
};