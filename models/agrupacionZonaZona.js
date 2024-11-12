const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { Zona } = require("./zona");

const AgrupacionZonaZona = db.define('AgrupacionZonaZona', {
    idClienteAgrupacionZona: {type: DataTypes.INTEGER},
    idZona: {type: DataTypes.INTEGER},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'AGRUPACIONZONA_ZONA'
});

AgrupacionZonaZona.belongsTo(Zona,{foreignKey:'idZona',as:'Zona',targetKey:'id'});

// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)

module.exports = {
    AgrupacionZonaZona,
    // Otros modelos pueden ser exportados aquí si es necesario
};