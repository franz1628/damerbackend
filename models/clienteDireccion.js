const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Cliente} = require("../models/cliente");
const {TipoDireccion} = require("../models/tipoDireccion");
const {Distrito} = require("../models/distrito");

const ClienteDireccion = db.define('ClienteDireccion', {
    idTipoDireccion: {type: DataTypes.INTEGER},
    idCliente: { type: DataTypes.INTEGER },
    idDistrito: { type: DataTypes.INTEGER },
    idUrbanizacion: { type: DataTypes.INTEGER },
    codVia: {type: DataTypes.INTEGER},
    numDomicilio: {type: DataTypes.INTEGER},
    interior: {type: DataTypes.INTEGER},
    manzana: {type: DataTypes.STRING},
    lote: {type: DataTypes.STRING},
    referencia: {type: DataTypes.TEXT},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CLIENTE_DIRECCION'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
ClienteDireccion.belongsTo(TipoDireccion, { foreignKey: 'idTipoDireccion',as:'TipoDireccion',targetKey:'id'})
ClienteDireccion.belongsTo(Distrito, { foreignKey: 'idDistrito',as:'Distrito',targetKey:'id'})
ClienteDireccion.belongsTo(Cliente, { foreignKey: 'idCliente'})

module.exports = {
    ClienteDireccion,
    // Otros modelos pueden ser exportados aquí si es necesario
};