const { DataTypes, Sequelize } = require("sequelize");
const { db } = require("../database/config");
const { Provincia } = require("./provincia");
const { Zona } = require("./zona");
const { Distrito } = require("./distrito");

const Via = db.define('Via', {
    idDistrito :{ type: DataTypes.INTEGER },
    idTipoVia :{ type: DataTypes.INTEGER },
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
    },
    
    fechaRegistro:{
        type : DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    fechaModificacion: {
        type: DataTypes.DATE,
    }
},{
    tableName: 'VIA',
    hooks: {
        beforeCreate: (model) => {
            if (model.descripcion) {
                model.descripcion = model.descripcion.toUpperCase();
            }
        },
        beforeUpdate: (model) => {
            model.fechaModificacion = new Date();
            if (model.descripcion) {
                model.descripcion = model.descripcion.toUpperCase();
            }
        }

    }
});

Via.belongsTo(Distrito, { foreignKey: 'idDistrito',as:'Distrito',targetKey:'id'})
//Via.belongsTo(Zona, { foreignKey: 'idZona',as:'Zona',targetKey:'id'})

// Ejemplo de relación con otra tabla (ajusta según tu modelo de datos)
// Usuario.belongsTo(TipoDocumento, { foreignKey: 'idTipoDocumento' });

module.exports = {
    Via,
    // Otros modelos pueden ser exportados aquí si es necesario
};