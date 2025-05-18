const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");


const Vista = db.define('Vista', {
    descripcion: {type: DataTypes.STRING},
    codigo: {type: DataTypes.STRING},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'VISTA',
    hooks: {
        beforeCreate: (model) => {
           
        },
        beforeUpdate: (model) => {
          
        }

    }
});


// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)


module.exports = {
    Vista,
    // Otros modelos pueden ser exportados aquí si es necesario
};