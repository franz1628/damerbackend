const { DataTypes } = require("sequelize");
const { db } = require("../database/config");
const { Cargo } = require("./cargo");

const Usuario = db.define('Usuario', {
    nombres: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    apellidoPaterno: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    apellidoMaterno: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    password2: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true,
        },
    },
    telefono: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    idTipoDocumento: {
        type: DataTypes.INTEGER,
    },
    nroDocumento: {
        type: DataTypes.STRING,
    },
    idCargo: {
        type: DataTypes.INTEGER,
    },
    vistas : {
        type: DataTypes.STRING,
        defaultValue: '',
    },
},{
    tableName: 'Usuario'
});

// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
// Usuario.belongsTo(TipoDocumento, { foreignKey: 'idTipoDocumento' });
Usuario.belongsTo(Cargo, { foreignKey: 'idCargo',as:'Cargo',targetKey:'id'})


module.exports = {
    Usuario,
    // Otros modelos pueden ser exportados aquí si es necesario
};