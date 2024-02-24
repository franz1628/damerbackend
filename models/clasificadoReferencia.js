const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const ClasificadoReferencia = db.define('ClasificadoReferencia', {
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
    tableName: 'CLASIFICADOREFERENCIA'
});

module.exports = {
    ClasificadoReferencia,
};