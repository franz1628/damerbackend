const { DataTypes, INTEGER } = require("sequelize");
const { db } = require("../database/config");
const { Vista } = require("./vista");
const { Permiso } = require("./permiso");

const UsuarioVista = db.define('UsuarioVista', {
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idVista: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idPermiso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},{
    tableName: 'USUARIO_VISTA',
});

// Ejemplo USUARIO_VISTA', relación con otra tabla (ajusta según tu modelo de datos)
// Usuario.belongsTo(TipoDocumento, { foreignKey: 'idTipoDocumento' });
UsuarioVista.belongsTo(Vista, { foreignKey: 'idVista',as:'Vista',targetKey:'id'});
UsuarioVista.belongsTo(Permiso, { foreignKey: 'idPermiso',as:'Permiso',targetKey:'id'});

module.exports = {
    UsuarioVista,
    // Otros modelos pueden ser exportados aquí si es necesario
};