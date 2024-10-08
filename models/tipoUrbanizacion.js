const { DataTypes } = require("sequelize");
const { db } = require("../database/config");
const { Provincia } = require("./provincia");

const TipoUrbanizacion = db.define('TipoUrbanizacion', {
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    descripcionResumida: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaModificacion: {
        type: DataTypes.DATE,
    }
},{
    tableName: 'TIPOURBANIZACION',
    hooks: {
        beforeCreate: (model) => {
            if (model.descripcion) {
                model.descripcion = model.descripcion.toUpperCase();
            }
        },
        beforeUpdate: (model) => {
            model.fechaModificacion = new Date()
            if (model.descripcion) {
                model.descripcion = model.descripcion.toUpperCase();
            }
        }

    }
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
// Usuario.belongsTo(TipoDocumento, { foreignKey: 'idTipoDocumento' });

module.exports = {
    TipoUrbanizacion,
    // Otros modelos pueden ser exportados aquí si es necesario
};