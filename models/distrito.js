const { DataTypes } = require("sequelize");
const { db } = require("../database/config");
const { Provincia } = require("./provincia");

const Distrito = db.define('Distrito', {
    codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    idZona :{ type: DataTypes.INTEGER },
    idProvincia :{ type: DataTypes.INTEGER },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    }
},{
    tableName: 'DISTRITO'
});

Distrito.belongsTo(Provincia, { foreignKey: 'idProvincia',as:'Provincia',targetKey:'id'})

// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
// Usuario.belongsTo(TipoDocumento, { foreignKey: 'idTipoDocumento' });

module.exports = {
    Distrito,
    // Otros modelos pueden ser exportados aquí si es necesario
};