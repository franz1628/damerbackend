const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
// const { TipoInformeOrden } = require("./tipoInformeOrden");


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

module.exports = {
    TipoEstudio, 
    // Otros modelos pueden ser exportados aquí si es necesario
};