const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const TipoInformeOrden = db.define('TipoInformeOrden', {
    codigo: {type: DataTypes.INTEGER},
    descripcion: {type: DataTypes.STRING},
    descripcionResumida: {type: DataTypes.STRING},
    tip: {type: DataTypes.STRING},
    claseInforme: {type: DataTypes.INTEGER},
    estudios: {type: DataTypes.INTEGER},
    variables: {type: DataTypes.INTEGER},
    unidades: {type: DataTypes.INTEGER},
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
    tableName: 'TIPOINFORMEORDEN'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
//TipoInformeOrden.belongsTo(Cliente, { foreignKey: 'codCliente'})
// TipoInformeOrden.belongsTo(Canal, { foreignKey: 'codCanal',as:'Canal',targetKey:'codigo'})
// TipoInformeOrden.belongsTo(Cliente, { foreignKey: 'codCliente',as:'Cliente',targetKey:'codigo'})

module.exports = {
    TipoInformeOrden,
    // Otros modelos pueden ser exportados aquí si es necesario
};