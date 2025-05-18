const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");


const Cargo = db.define('Cargo', {
    descripcion: {type: DataTypes.STRING},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    fechaModificacion:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CARGO',
    hooks: {
        beforeCreate: (model) => {
           
        },
        beforeUpdate: (model) => {
          
        }

    }
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)


module.exports = {
    Cargo,
    // Otros modelos pueden ser exportados aquí si es necesario
};