const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Pais = db.define('Pais', {
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
    tableName: 'PAIS',
    hooks: {
        beforeCreate: (model) => {
            if (model.descripcion) {
                model.descripcion = model.descripcion.toUpperCase();
            }
        },
        beforeUpdate: (model) => {
            if (model.descripcion) {
                model.descripcion = model.descripcion.toUpperCase();
            }
        }

    }
});

// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
// Usuario.belongsTo(TipoDocumento, { foreignKey: 'idTipoDocumento' });

module.exports = {
    Pais,
    // Otros modelos pueden ser exportados aquí si es necesario
};