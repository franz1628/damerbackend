const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { TipoRelevamiento } = require("./tipoRelevamiento");

const Canal = db.define('canal', {
    descripcion: {
        type: DataTypes.STRING
    },
    descripcionResumida: {
        type: DataTypes.STRING
    },
    tip: {type: DataTypes.NUMBER},
    factorRecargo: {type: DataTypes.NUMBER,defaultValue:1},
    avancePermNego: {type: DataTypes.NUMBER,defaultValue:100},
    avancePermProsp: {type: DataTypes.NUMBER,defaultValue:100},
    tieneExhibidor: {type: DataTypes.NUMBER,defaultValue:1},
    alias1: {type: DataTypes.STRING},
    alias2: {type: DataTypes.STRING},
    alias3: {type: DataTypes.STRING},
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
    tableName: 'CANAL',
    hooks: {
        beforeCreate: (model) => {
            if (model.descripcion) {
                model.descripcion = model.descripcion.toUpperCase();
            }
        },
        beforeUpdate: (model) => {
            model.fechaModificacion=new Date();
            if (model.descripcion) {
                model.descripcion = model.descripcion.toUpperCase();
            }
        }

    }
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
Canal.belongsTo(TipoRelevamiento, { foreignKey: 'idTipoRelevamiento',defaultValue:1 });

module.exports = {
    Canal,
    // Otros modelos pueden ser exportados aquí si es necesario
};