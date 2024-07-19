const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {AgrupacionCategoriaCategoria} = require("../models/agrupacionCategoriaCategoria")

const ClienteAgrupacionCategoria = db.define('ClienteAgrupacionCategoria', {
    idCliente: {type: DataTypes.INTEGER},
    nombre: {type: DataTypes.STRING},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CLIENTE_AGRUPACIONCATEGORIA'
});

ClienteAgrupacionCategoria.hasMany(AgrupacionCategoriaCategoria,{foreignKey:'idClienteAgrupacionCategoria',as:'AgrupacionCategoriaCategoria',targetKey:'id'});


module.exports = {
    ClienteAgrupacionCategoria,
    // Otros modelos pueden ser exportados aquí si es necesario
};