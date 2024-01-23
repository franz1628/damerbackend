const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Cliente} = require("./cliente");
const {Categoria} = require("./categoria");

const AtributoFuncionalVariedad = db.define('AtributoFuncionalVariedad', {
    codCliente: {type: DataTypes.INTEGER},
    codCategoria: {type: DataTypes.INTEGER},
    codigo: {type: DataTypes.INTEGER},
    descripcion: {type: DataTypes.STRING},
    descripcionResumida: {type: DataTypes.STRING},
    tip: {type: DataTypes.STRING},
    idIndiceAtributo: {type: DataTypes.INTEGER},
    idTipoUnidadMedida: {type: DataTypes.INTEGER},
    idUnidadMedida: {type: DataTypes.INTEGER},
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
    tableName: 'ATRIBUTOFUNCIONALVARIEDAD'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
//AtributoFuncionalVariedad.belongsTo(Cliente, { foreignKey: 'codCliente'})
AtributoFuncionalVariedad.belongsTo(Categoria, { foreignKey: 'codCanal',as:'Canal',targetKey:'codigo'})
AtributoFuncionalVariedad.belongsTo(Cliente, { foreignKey: 'codCategoria',as:'Categoria',targetKey:'codigo'})

module.exports = {
    AtributoFuncionalVariedad,
    // Otros modelos pueden ser exportados aquí si es necesario
};