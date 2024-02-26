const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { TipoRelevamiento } = require("./tipoRelevamiento");

const Canal = db.define('canal', {
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
    tip: {type: DataTypes.NUMBER},
    factorRecargo: {type: DataTypes.NUMBER,defaultValue:1},
    avancePermNego: {type: DataTypes.NUMBER,defaultValue:100},
    avancePermProsp: {type: DataTypes.NUMBER,defaultValue:100},
    tieneExhibidor: {type: DataTypes.NUMBER,defaultValue:1},
    alias1: {type: DataTypes.STRING},
    alias2: {type: DataTypes.STRING},
    alias3: {type: DataTypes.STRING},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CANAL'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
Canal.belongsTo(TipoRelevamiento, { foreignKey: 'idTipoRelevamiento',defaultValue:1 });

module.exports = {
    Canal,
    // Otros modelos pueden ser exportados aquí si es necesario
};