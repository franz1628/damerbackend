const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const TipoCategoria = db.define('TipoCategoria', {
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
    tableName: 'TIPOCATEGORIA'
});



module.exports = {
    TipoCategoria
};