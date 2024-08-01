const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Parametro = db.define('Parametro', {
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    descripcionResumida: {
        type: DataTypes.STRING
    },
    tip: {
        type: DataTypes.STRING
    },
    idClasificadoReferencia: {
        type: DataTypes.INTEGER
    },
    valorParametro1: {
        type: DataTypes.DECIMAL
    },
    valorParametro2: {
        type: DataTypes.DECIMAL
    },
    valorParametro3: {
        type: DataTypes.DECIMAL
    },
    inicioVigencia: {
        type: DataTypes.DATE
    },
    alias1: {
        type: DataTypes.STRING
    },
    alias2: {
        type: DataTypes.STRING
    },
    alias3: {
        type: DataTypes.STRING
    },
    idEstadoRegistro: {
        type: DataTypes.INTEGER,
        defaultValue:1
    },
    estado: {
        type: DataTypes.INTEGER,
        defaultValue:1
    },

   
},{
    tableName: 'PARAMETRO',
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
    Parametro,
    // Otros modelos pueden ser exportados aquí si es necesario
};