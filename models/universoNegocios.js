const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Zona} = require("../models/zona");
const {Canal} = require("../models/canal");
const { Distrito } = require("./distrito");

const UniversoNegocios = db.define('UniversoNegocios', {
    idZona: {type: DataTypes.INTEGER},
    idDistrito: {type: DataTypes.INTEGER},
    idCanal: {type: DataTypes.INTEGER},
    valor: {type: DataTypes.INTEGER},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    fechaModificacion: {
        type: DataTypes.DATE,
    }
},{
    tableName: 'UNIVERSONEGOCIOS',
    hooks: {
        beforeCreate: (model) => {
            if(!model.fechaModificacion){
                model.fechaModificacion = new Date();
            }
        },
        beforeUpdate: (model) => {
            model.fechaModificacion = new Date();
        }
    }
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
UniversoNegocios.belongsTo(Canal, { foreignKey: 'idCanal',as:'Canal',targetKey:'id'})
UniversoNegocios.belongsTo(Zona, { foreignKey: 'idZona',as:'Zona',targetKey:'id'})
UniversoNegocios.belongsTo(Distrito, { foreignKey: 'idDistrito',as:'Distrito',targetKey:'id'})

module.exports = {
    UniversoNegocios,
    // Otros modelos pueden ser exportados aquí si es necesario
};