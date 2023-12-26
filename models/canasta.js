const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const Canasta = db.define('Canasta', {
    codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    descripcion: {type: DataTypes.STRING},
    descripcionResumida: {type: DataTypes.STRING},
    tip: {type: DataTypes.STRING},
    especificarAltura: {type: DataTypes.INTEGER},
    especificarAnchura: {type: DataTypes.INTEGER},
    especificarProfundidad: {type: DataTypes.INTEGER},
    especificarModelo: {type: DataTypes.INTEGER},
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
    tableName: 'CANASTA'
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
//Canasta.belongsTo(TipoRelevamiento, { foreignKey: 'idTipoRelevamiento',defaultValue:1 });

module.exports = {
    Canasta,
    // Otros modelos pueden ser exportados aquí si es necesario
};