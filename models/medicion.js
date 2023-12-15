const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { Pais } = require("./pais");

const Medicion = db.define('Medicion', {
    anio: {type: DataTypes.INTEGER},
    mes: {type: DataTypes.INTEGER},
    medicion: {type: DataTypes.INTEGER},
    codPais: {type: DataTypes.INTEGER},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'MEDICION'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
//Medicion.belongsTo(Pais, { foreignKey: 'codPais',defaultValue:1 });

module.exports = {
    Medicion,
    // Otros modelos pueden ser exportados aquí si es necesario
};