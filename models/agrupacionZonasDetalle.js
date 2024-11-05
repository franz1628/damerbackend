const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { Zona } = require("./zona");
const { AgrupacionZonas } = require("./agrupacionZonas");
 
const AgrupacionZonasDetalle = db.define('AgrupacionZonasDetalle', {
    idAgrupacionZonas : {type: DataTypes.INTEGER},
    idZona: {type: DataTypes.INTEGER},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.STRING,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    fechaModificacion: {
        type: DataTypes.STRING,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        
    }
},{
    tableName: 'AGRUPACIONZONAS_DETALLE',
    hooks: {
        beforeCreate: (model) => {

        },
        beforeUpdate: (model) => {
            model.fechaModificacion = Sequelize.literal('CURRENT_TIMESTAMP');
        }

    }
});

AgrupacionZonasDetalle.belongsTo(Zona, { foreignKey: 'idZona',as:'Zona',targetKey:'id'})
AgrupacionZonasDetalle.belongsTo(AgrupacionZonas, { foreignKey: 'idAgrupacionZonas',as:'AgrupacionZonas',targetKey:'id'})
AgrupacionZonas.hasMany(AgrupacionZonasDetalle,{foreignKey:'id',as:'AgrupacionZonaDetalle',targetKey:'idAgrupacionZonas'});

module.exports = {
    AgrupacionZonasDetalle,
    // Otros modelos pueden ser exportados aquí si es necesario
};