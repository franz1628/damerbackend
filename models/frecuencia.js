const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const Frecuencia = db.define('Frecuencia', {
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
    tableName: 'FRECUENCIA'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
// Frecuencia.belongsTo(MegaFrecuencia, { foreignKey: 'codMegaFrecuencia',defaultValue:0 })

module.exports = {
    Frecuencia,
    // Otros modelos pueden ser exportados aquí si es necesario
};