const express = require('express');
const cors = require('cors');

const { db } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || 8080;
        this.authPath = '/api/auth';
        this.personPath = '/api/person';
        this.usuarioPath = '/api/usuario';

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
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
