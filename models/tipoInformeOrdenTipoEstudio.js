const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { TipoInformeOrden } = require("./tipoInformeOrden");
const { TipoEstudio } = require("./tipoEstudio");

const TipoInformeOrdenTipoEstudio = db.define('TipoInformeOrdenTipoEstudio', {
    idTipoInformeOrden: {type: DataTypes.INTEGER},
    idTipoEstudio: {type: DataTypes.INTEGER},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'TIPOINFORMEORDEN_TIPOESTUDIO'
}); 

TipoInformeOrden.belongsToMany(TipoEstudio, { through: 'TipoInformeOrdenTipoEstudio',foreignKey:'idTipoInformeOrden',as:'TipoEstudio'})
TipoEstudio.belongsToMany(TipoInformeOrden, { through: 'TipoInformeOrdenTipoEstudio',foreignKey:'idTipoEstudio',as:'TipoInformeOrden'});
 
module.exports = {
    TipoInformeOrdenTipoEstudio,
    // Otros modelos pueden ser exportados aquí si es necesario
};