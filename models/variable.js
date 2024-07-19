const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const Variable = db.define('Variable', {
    codigo: { type: DataTypes.INTEGER },
    idTipoVariable: { type: DataTypes.INTEGER },
    idGrupoVariable: { type: DataTypes.INTEGER },
    descripcion: { type: DataTypes.STRING },
    descripcionResumida: { type: DataTypes.STRING },
    tip: { type: DataTypes.STRING },
    codAtributoTecnicoVariedad: { type: DataTypes.INTEGER },
    idCliente: { type: DataTypes.INTEGER },
    indicadorFotografia: { type: DataTypes.INTEGER },
    numFotos: { type: DataTypes.INTEGER },
    idInputClasificado: { type: DataTypes.INTEGER },
    usaPosible: { type: DataTypes.INTEGER },
    variasRespuestas: { type: DataTypes.INTEGER },
    rangoMinimo: { type: DataTypes.INTEGER },
    rangoMaximo: { type: DataTypes.INTEGER },
    manejoRangos: { type: DataTypes.INTEGER },
    forzarMinimo: { type: DataTypes.INTEGER },
    redondeoMaximo: { type: DataTypes.INTEGER },
    cantidadDecimalesMaximo: { type: DataTypes.INTEGER },
    redondeoMinimo: { type: DataTypes.INTEGER },
    cantidadDecimalesMinimo: { type: DataTypes.INTEGER },
    pesoExtra: { type: DataTypes.NUMBER },
    varEstratificacion: { type: DataTypes.INTEGER },
    tiempoRespuesta: { type: DataTypes.INTEGER },
    usoCalculadora: { type: DataTypes.INTEGER },
    reqUndVta: { type: DataTypes.INTEGER },
    respuestaAfecta: { type: DataTypes.INTEGER },
    funcionResult: { type: DataTypes.INTEGER },
    numeroOrden: { type: DataTypes.INTEGER },
    respuestaObligatoria: { type: DataTypes.INTEGER },
    observaciones: { type: DataTypes.TEXT },
    explicacionFuncionamiento: { type: DataTypes.TEXT },
    alias1: { type: DataTypes.STRING },
    alias2: { type: DataTypes.STRING },
    alias3: { type: DataTypes.STRING },
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    tableName: 'VARIABLE'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
// AtributoTecnicoVariedad.belongsTo(AtributoTecnicoVariedad, { foreignKey: 'AtributoTecnicoVariedad',defaultValue:0 })

module.exports = {
    Variable,
    // Otros modelos pueden ser exportados aquí si es necesario
};