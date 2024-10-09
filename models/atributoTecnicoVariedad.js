const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const AtributoTecnicoVariedad = db.define('AtributoTecnicoVariedad', {
    idPais: {type: DataTypes.INTEGER},
    descripcion: {type: DataTypes.STRING},
    descripcionResumida: {type: DataTypes.STRING},
    tip: {type: DataTypes.STRING},
    posiblesValores: {type: DataTypes.INTEGER},
    solicitarUnidad: {type: DataTypes.INTEGER},
    variosValores: {type: DataTypes.INTEGER},
    idClasificadoReferencia: {type: DataTypes.INTEGER},
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
    tableName: 'ATRIBUTOTECNICOVARIEDAD',
    hooks: {
        beforeCreate: (model) => {
            model.fechaModificacion = new Date();
            if (model.descripcion) {
                model.descripcion = model.descripcion.toUpperCase();
            }
        },
        beforeUpdate: (model) => {
            model.fechaModificacion = new Date();
            if (model.descripcion) {
                model.descripcion = model.descripcion.toUpperCase();
            }
        }

    }
});

// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
// AtributoTecnicoVariedad.belongsTo(AtributoTecnicoVariedad, { foreignKey: 'AtributoTecnicoVariedad',defaultValue:0 })

module.exports = {
    AtributoTecnicoVariedad,
    // Otros modelos pueden ser exportados aquí si es necesario
};