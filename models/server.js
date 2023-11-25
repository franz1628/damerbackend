const express = require('express');
const cors = require('cors');

const { db } = require('../database/config');
const path = require('path');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 8080;
        this.authPath = '/api/auth';
        this.personPath = '/api/person';
        this.usuarioPath = '/api/usuario';
        this.paisPath = '/api/pais';
        this.parametroPath = '/api/parametro';

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        try {
            db.authenticate();
            console.log('DB online');
        } catch (error) {
            throw new Error(error)
        }
        
    }


    middlewares() {
        this.app.use( cors() );

        this.app.use( express.json() );

        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.personPath, require('../routes/person'));
        this.app.use( this.usuarioPath, require('../routes/usuario'));
        this.app.use( this.paisPath, require('../routes/pais'));
        this.app.use( this.parametroPath, require('../routes/parametro'));


        this.app.use(express.static(path.join(__dirname, '../dist')));
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../dist/index.html'));
          });
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
