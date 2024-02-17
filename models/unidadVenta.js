const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {TipoUnidadMedida} = require("../models/tipoUnidadMedida");
const {UnidadMedida} = require("../models/unidadMedida");

const UnidadVenta = db.define('UnidadVenta', {
    codigo: {type: DataTypes.INTEGER},
    descripcion: {type: DataTypes.STRING},
    descripcionResumida: {type: DataTypes.STRING},
    tip: {type: DataTypes.STRING},
    formaUso: {type: DataTypes.INTEGER},
    alias1: {type: DataTypes.STRING},
    alias2: {type: DataTypes.STRING},
    alias3: {type: DataTypes.STRING},
    memo: {type: DataTypes.STRING},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'UNIDADVENTA'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
//UnidadVenta.belongsTo(Cliente, { foreignKey: 'codCliente'})
UnidadVenta.belongsTo(TipoUnidadMedida, { foreignKey: 'idTipoUnidadMedida',as:'TipoUnidadMedida',targetKey:'id'})
UnidadVenta.belongsTo(UnidadMedida, { foreignKey: 'idUnidadMedida',as:'UnidadMedida',targetKey:'id'})



module.exports = {
    UnidadVenta,
    // Otros modelos pueden ser exportados aquí si es necesario
};