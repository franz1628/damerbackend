const { DataTypes } = require("sequelize");
const { db } = require("../database/config");
const { Sku } = require("./sku");


const SkuHijos = db.define('SkuHijos', {
    descripcion: {type: DataTypes.STRING},
    idSkuPadre: {type: DataTypes.INTEGER},
    idSku: {type: DataTypes.INTEGER},
    cantidad: {type: DataTypes.INTEGER},
    porcentaje: {type: DataTypes.INTEGER},

    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE
    }
},{
    tableName: 'SKU_HIJOS'
});






module.exports = {
    SkuHijos,
    // Otros modelos pueden ser exportados aquí si es necesario
};