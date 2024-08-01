const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");


const AgrupacionCanals = db.define('AgrupacionCanals', {
    descripcion: { type: DataTypes.STRING },
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    tableName: 'AGRUPACIONCANALS',
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

db.sync();

module.exports = {
    AgrupacionCanals,
    // Otros modelos pueden ser exportados aquí si es necesario
};