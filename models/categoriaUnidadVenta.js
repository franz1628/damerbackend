const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Categoria} = require("./categoria");
const {UnidadVenta} = require("./unidadVenta");

const CategoriaUnidadVenta = db.define('CategoriaUnidadVenta', {
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CATEGORIA_UNIDADVENTA'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
//CategoriaUnidadVenta.belongsTo(Cliente, { foreignKey: 'codCliente'})
CategoriaUnidadVenta.belongsTo(Categoria, { foreignKey: 'idCategoria',as:'Categoria',targetKey:'id'})
CategoriaUnidadVenta.belongsTo(UnidadVenta, { foreignKey: 'idUnidadVenta',as:'UnidadVenta',targetKey:'id'})


module.exports = {
    CategoriaUnidadVenta,
    // Otros modelos pueden ser exportados aquí si es necesario
};