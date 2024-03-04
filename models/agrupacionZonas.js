const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

 
const AgrupacionZonas = db.define('AgrupacionZonas', {
    descripcion: {type: DataTypes.STRING},
    descripcionResumida: {type: DataTypes.STRING},
    tip: {type: DataTypes.STRING},
    idTipoAgrupacion1: {type: DataTypes.INTEGER},
    idTipoAgrupacion2: {type: DataTypes.INTEGER},
    idTipoAgrupacion3: {type: DataTypes.INTEGER},
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
    tableName: 'AGRUPACIONZONAS'
});

module.exports = {
    AgrupacionZonas,
    // Otros modelos pueden ser exportados aquí si es necesario
};