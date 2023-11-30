const { DataTypes } = require("sequelize");
const { db } = require("../database/config");
const { Departamento } = require("./departamento");

const Provincia = db.define('Pais', {
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
    tableName: 'PROVINCIA'
});

Provincia.belongsTo(Departamento,{foreignKey:'idDepartamento'});

// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
// Usuario.belongsTo(TipoDocumento, { foreignKey: 'idTipoDocumento' });

module.exports = {
    Provincia,
    // Otros modelos pueden ser exportados aquí si es necesario
};