const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");

const ClienteFiltro = db.define('ClienteFiltro', {
    idAtributoFuncionalVariedadValor :{type:DataTypes.INTEGER},

    condicion :{type:DataTypes.INTEGER},
    valor1 :{type:DataTypes.INTEGER},
    valor2 :{type:DataTypes.INTEGER},

    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    }, 
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'CLIENTE_FILTRO'
});


module.exports = {
    ClienteFiltro,
    // Otros modelos pueden ser exportados aquí si es necesario
};