const express = require('express');
const cors = require('cors');

const { db } = require('../database/config');
const path = require('path');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.authPath = '/api/auth';
        this.personPath = '/api/person';
        this.usuarioPath = '/api/usuario';
        this.paisPath = '/api/pais';
        this.departamentoPath = '/api/departamento';
        this.provinciaPath = '/api/provincia';
        this.distritoPath = '/api/distrito';
        this.negocioPath = '/api/negocio';
        this.tipoUrbanizacionPath = '/api/tipoUrbanizacion';
        this.parametroPath = '/api/parametro';
        this.canalPath = '/api/canal';
        this.zonaPath = '/api/zona';
        this.tipoZonaPath = '/api/tipoZona';
        this.urbanizacionPath = '/api/urbanizacion';
        this.canastaPath = '/api/canasta';
        this.megaCategoriaPath = '/api/megaCategoria';
        this.categoriaPath = '/api/categoria';
        this.skuPath = '/api/sku';
        this.medicionPath = '/api/medicion';
        this.tipoCambioPath = '/api/tipoCambio';
        this.tipoTipoCambioPath = '/api/tipoTipoCambio';
        this.monedaPath = '/api/moneda';
        this.clientePath = '/api/cliente';
        this.clienteDireccionPath = '/api/clienteDireccion';
        this.clienteContactoPath = '/api/clienteContacto';
        this.atributoTecnicoVariedadPath = '/api/atributoTecnicoVariedad';
        this.atributoTecnicoNegocioPath = '/api/atributoTecnicoNegocio';
        this.variablePath = '/api/variable';

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
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.personPath, require('../routes/person'));
        this.app.use(this.usuarioPath, require('../routes/usuario'));
        this.app.use(this.paisPath, require('../routes/pais'));
        this.app.use(this.departamentoPath, require('../routes/departamento'));
        this.app.use(this.provinciaPath, require('../routes/provincia'));
        this.app.use(this.distritoPath, require('../routes/distrito'));
        this.app.use(this.negocioPath, require('../routes/negocio'));
        this.app.use(this.tipoUrbanizacionPath, require('../routes/tipoUrbanizacion'));
        this.app.use(this.parametroPath, require('../routes/parametro'));
        this.app.use(this.canalPath, require('../routes/canal'));
        this.app.use(this.zonaPath, require('../routes/zona'));
        this.app.use(this.tipoZonaPath, require('../routes/tipoZona'));
        this.app.use(this.urbanizacionPath, require('../routes/urbanizacion'));
        this.app.use(this.canastaPath, require('../routes/canasta'));
        this.app.use(this.megaCategoriaPath, require('../routes/megaCategoria'));
        this.app.use(this.categoriaPath, require('../routes/categoria'));
        this.app.use(this.skuPath, require('../routes/sku'));
        this.app.use(this.medicionPath, require('../routes/medicion'));
        this.app.use(this.tipoCambioPath, require('../routes/tipoCambio'));
        this.app.use(this.tipoTipoCambioPath, require('../routes/tipoTipoCambio'));
        this.app.use(this.monedaPath, require('../routes/moneda'));
        this.app.use(this.clientePath, require('../routes/cliente'));
        this.app.use(this.clienteDireccionPath, require('../routes/clienteDireccion'));
        this.app.use(this.clienteContactoPath, require('../routes/clienteContacto'));
        this.app.use(this.atributoTecnicoVariedadPath, require('../routes/atributoTecnicoVariedad'));
        this.app.use(this.atributoTecnicoNegocioPath, require('../routes/atributoTecnicoNegocio'));
        this.app.use(this.variablePath, require('../routes/variable'));


        this.app.use(express.static(path.join(__dirname, '../dist')));
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../dist/index.html'));
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;
