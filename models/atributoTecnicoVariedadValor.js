const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { AtributoTecnicoVariedad } = require("./atributoTecnicoVariedad");

const AtributoTecnicoVariedadValor = db.define('AtributoTecnicoVariedadValor', {
    codigo : {type: DataTypes.INTEGER},
	valor : {type: DataTypes.STRING},
	comentario : {type: DataTypes.STRING},
	alias1 : {type: DataTypes.STRING},
	idConvenio : {type: DataTypes.INTEGER},
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
},{
    tableName: 'ATRIBUTOTECNICOVARIEDAD_VALOR'
});

AtributoTecnicoVariedadValor.belongsTo(AtributoTecnicoVariedad, { foreignKey: 'codAtributoTecnicoVariedad'})
// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
// AtributoTecnicoVariedad.belongsTo(AtributoTecnicoVariedad, { foreignKey: 'AtributoTecnicoVariedad',defaultValue:0 })

module.exports = {
    AtributoTecnicoVariedadValor,
    // Otros modelos pueden ser exportados aquí si es necesario
};