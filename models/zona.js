const { DataTypes } = require("sequelize");
const { db } = require("../database/config");
const { TipoRelevamiento } = require("./tipoRelevamiento");
const { TipoZona } = require("./tipoZona");

const Zona = db.define('Zona', {
    codigo: { type: DataTypes.INTEGER, },
    descripcion: { type: DataTypes.STRING, },
    numeroOrden: { type: DataTypes.INTEGER },
    estado: { type: DataTypes.INTEGER, defaultValue: 1, },
    alias1: { type: DataTypes.STRING },
    alias2: { type: DataTypes.STRING },
    alias3: { type: DataTypes.STRING }, 

    fechaRegistro: { type: DataTypes.DATE },
    fechaModificacion: {
        type: DataTypes.DATE,
    }
}, {
    tableName: 'ZONA',
    hooks: {
        beforeCreate: (model) => {
            if (model.descripcion) {
                model.descripcion = model.descripcion.toUpperCase();
            }
        },
        beforeUpdate: (model) => {
            model.fechaModificacion = new Date()
            if (model.descripcion) {
                model.descripcion = model.descripcion.toUpperCase();
            }
        }

    }
});



Zona.belongsTo(TipoZona, { foreignKey: 'idTipoZona',defaultValue:1 });

module.exports = {
    Zona,
   
};