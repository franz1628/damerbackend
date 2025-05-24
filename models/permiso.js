const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Permiso = db.define('Permiso', {
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
},{
    tableName: 'PERMISO'
});

// Ejemplo USUARIO_VISTA', relación con otra tabla (ajusta según tu modelo de datos)
// Usuario.belongsTo(TipoDocumento, { foreignKey: 'idTipoDocumento' });


module.exports = {
    Permiso,
    // Otros modelos pueden ser exportados aquí si es necesario
};