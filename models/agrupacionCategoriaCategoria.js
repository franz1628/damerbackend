const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { Categoria } = require("./categoria");

const AgrupacionCategoriaCategoria = db.define('AgrupacionCategoriaCategoria', {
    idClienteAgrupacionCategoria: {type: DataTypes.INTEGER},
    idCategoria: {type: DataTypes.INTEGER},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'AGRUPACIONCATEGORIA_CATEGORIA'
});

AgrupacionCategoriaCategoria.belongsTo(Categoria,{foreignKey:'idCategoria',as:'Categoria',targetKey:'id'});

// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
//ClienteAgrupacionCategoria.belongsTo(Cliente, { foreignKey: 'codCliente'})
//ClienteAgrupacionCategoria.belongsTo(Categoria, { foreignKey: 'idCategoria',as:'Categoria',targetKey:'id'})
//ClienteAgrupacionCategoria.belongsTo(Cliente, { foreignKey: 'idCliente',as:'Cliente',targetKey:'id'})

module.exports = {
    AgrupacionCategoriaCategoria,
    // Otros modelos pueden ser exportados aquí si es necesario
};