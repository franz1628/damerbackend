//const sql = require('mssql');

// Configuración de la conexión a SQL Server
/*const config = {
  user: 'sa',
  password: '1234',
  server: '25.6.206.8', // Puede ser una dirección IP o un nombre de host
  database: 'Damer',
  options: {
    encrypt: false,
  }
};*/

const { Sequelize } = require('sequelize');

const db = new Sequelize('damer', 'sa', '1234', {
 //host: '25.6.206.8',
    host: '127.0.0.1',
  dialect: 'mssql',
  pool: {
    max: 5, // Número máximo de conexiones activas
    min: 0, // Número mínimo de conexiones activas
    acquire: 30000, // Tiempo máximo de espera para obtener una conexión (ms)
    idle: 10000 // Tiempo antes de cerrar conexiones inactivas (ms)
  },
  define: {
    timestamps: false, 
  },
  //logging: console.log
});

/*const dbConnection = async () => {

    try {

        await sql.connect(config);

        console.log('Base de datos online');

    } catch (error) {
        console.error('Error al conectar o realizar la consulta:', error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}*/

/*const mongoose = require('mongoose');



const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify:true
        });

        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}
*/


module.exports = {
    db
}
