const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const {Cliente} = require("./cliente");
const {Canal} = require("./canal");

const TipoEstudio = db.define('TipoEstudio', {

    codigo :  {type: DataTypes.INTEGER},
    descripcion :  {type: DataTypes.STRING},
    descripcionResumida :  {type: DataTypes.STRING},
    tip :  {type: DataTypes.STRING},
    intTipoProyeccion :  {type: DataTypes.INTEGER},
    intPrioridadLevantamiento :  {type: DataTypes.INTEGER},
    indicarSolicitarBandeja :  {type: DataTypes.INTEGER},
    indicarUtilizarMuestra :  {type: DataTypes.INTEGER},
    especificarAtributo :  {type: DataTypes.INTEGER},
    indicarEspecificarSku :  {type: DataTypes.INTEGER},
    indicarMuestraReal :  {type: DataTypes.INTEGER},
    alias1 :  {type: DataTypes.STRING},
    alias2 :  {type: DataTypes.STRING},
    alias3 :  {type: DataTypes.STRING},

    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'TIPOESTUDIO'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
//TipoEstudio.belongsTo(Cliente, { foreignKey: 'codCliente'})
// TipoEstudio.belongsTo(Canal, { foreignKey: 'codCanal',as:'Canal',targetKey:'codigo'})
// TipoEstudio.belongsTo(Cliente, { foreignKey: 'codCliente',as:'Cliente',targetKey:'codigo'})

module.exports = {
    TipoEstudio,
    // Otros modelos pueden ser exportados aquí si es necesario
};