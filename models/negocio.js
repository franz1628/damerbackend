const { DataTypes } = require("sequelize");
const { db } = require("../database/config");
const { Provincia } = require("./provincia");

const Negocio = db.define('Negocio', {
    codigo: { type: DataTypes.INTEGER },
    ruc: { type: DataTypes.STRING },
    nombreComercial: { type: DataTypes.STRING },
    nombreResumido: { type: DataTypes.STRING },
    nombreTip: { type: DataTypes.STRING },
    codCanal: { type: DataTypes.INTEGER },
    codZona: { type: DataTypes.INTEGER },
    direccion: { type: DataTypes.STRING },
   // codDistrito: { type: DataTypes.INTEGER },
    codUrb: { type: DataTypes.INTEGER },
    codRuta: { type: DataTypes.INTEGER },
    lat: { type: DataTypes.STRING },
    lgn: { type: DataTypes.STRING },
    estado: { type: DataTypes.INTEGER, defaultValue:1 },
    fechaRegistro: { type: DataTypes.Date, defaultValue :new Date() },
    fechaActualiza: { type: DataTypes.Date },
    entregaFactura: { type: DataTypes.INTEGER },
    levantarNegocio: { type: DataTypes.INTEGER },
    negocioEquivalente: { type: DataTypes.INTEGER },
    telefono: { type: DataTypes.STRING },
    fax: { type: DataTypes.STRING },
    referencia: { type: DataTypes.STRING },
    zonaAccidentada: { type: DataTypes.INTEGER },
    zonaRiesgo: { type: DataTypes.INTEGER },
    aceptaProductos: { type: DataTypes.INTEGER },
    tipoHorario: { type: DataTypes.INTEGER },
    codVia: { type: DataTypes.INTEGER },
    numeroDomicilio: { type: DataTypes.INTEGER },
    interior: { type: DataTypes.STRING },
    manzana: { type: DataTypes.STRING },
    lote: { type: DataTypes.STRING },
}, {
    tableName: 'NEGOCIO'
});

Distrito.belongsTo(Distrito, { foreignKey: 'codDistrito',targetKey:'codigo' });

// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
// Usuario.belongsTo(TipoDocumento, { foreignKey: 'idTipoDocumento' });

module.exports = {
    Distrito,
    // Otros modelos pueden ser exportados aquí si es necesario
};