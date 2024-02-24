const { DataTypes } = require("sequelize");
const { db } = require("../database/config");
const { Provincia } = require("./provincia");

const Negocio = db.define('Negocio', {
    ruc: { type: DataTypes.STRING },
    nombreComercial: { type: DataTypes.STRING },
    nombreResumido: { type: DataTypes.STRING },
    nombreTip: { type: DataTypes.STRING },
    idCanal: { type: DataTypes.INTEGER },
    direccion: { type: DataTypes.STRING },
    idDistrito: { type: DataTypes.INTEGER },
    idUrbanizacion: { type: DataTypes.INTEGER },
    idRuta: { type: DataTypes.INTEGER },
    lat: { type: DataTypes.STRING },
    lgn: { type: DataTypes.STRING },
    estado: { type: DataTypes.INTEGER, defaultValue:1 },
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
    idVia: { type: DataTypes.INTEGER },
    numeroDomicilio: { type: DataTypes.INTEGER },
    interior: { type: DataTypes.STRING },
    manzana: { type: DataTypes.STRING },
    lote: { type: DataTypes.STRING },
}, {
    tableName: 'NEGOCIO'
});

//Negocio.belongsTo(Distrito, { foreignKey: 'codDistrito',targetKey:'codigo' });

// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
// Usuario.belongsTo(TipoDocumento, { foreignKey: 'idTipoDocumento' });

module.exports = {
    Negocio,
    // Otros modelos pueden ser exportados aquí si es necesario
};