const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const AtributoTecnicoNegocio = db.define('AtributoTecnicoNegocio', {
    idPais: {type: DataTypes.INTEGER},
    codigo: {type: DataTypes.INTEGER},
    descripcion: {type: DataTypes.STRING},
    descripcionResumida: {type: DataTypes.STRING},
    tip: {type: DataTypes.STRING},
    posiblesValores: {type: DataTypes.INTEGER},
    idInputClasificado: {type: DataTypes.INTEGER},
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
    }
},{
    tableName: 'ATRIBUTOTECNICONEGOCIO'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
// AtributoTecnicoVariedad.belongsTo(AtributoTecnicoVariedad, { foreignKey: 'AtributoTecnicoVariedad',defaultValue:0 })

module.exports = {
    AtributoTecnicoNegocio,
    // Otros modelos pueden ser exportados aquí si es necesario
};