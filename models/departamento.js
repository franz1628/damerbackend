const { DataTypes } = require("sequelize");
const { db } = require("../database/config");
const { Pais } = require("./pais");

const Departamento = db.define('Pais', {
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
    tableName: 'DEPARTAMENTO'
});

Departamento.belongsTo(Pais,{foreignKey:'idPais'});

// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
// Usuario.belongsTo(TipoDocumento, { foreignKey: 'idTipoDocumento' });

module.exports = {
    Departamento,
    // Otros modelos pueden ser exportados aquí si es necesario
};