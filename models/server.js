const express = require('express');
const cors = require('cors');

const { db } = require('../database/config');
const path = require('path');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;

        this.paths = {
            auth: '/api/auth',
            person: '/api/person',
            usuario: '/api/usuario',
            pais: '/api/pais',
            departamento: '/api/departamento',
            provincia: '/api/provincia',
            distrito: '/api/distrito',
            negocio: '/api/negocio',
            tipoUrbanizacion: '/api/tipoUrbanizacion',
            parametro: '/api/parametro',
            canal: '/api/canal',
            zona: '/api/zona',
            tipoZona: '/api/tipoZona',
            urbanizacion: '/api/urbanizacion',
            canasta: '/api/canasta',
            megaCategoria: '/api/megaCategoria',
            categoria: '/api/categoria',
            sku: '/api/sku',
            medicion: '/api/medicion',
            tipoCambio: '/api/tipoCambio',
            tipoTipoCambio: '/api/tipoTipoCambio',
            moneda: '/api/moneda',
            cliente: '/api/cliente',
            clienteDireccion: '/api/clienteDireccion',
            clienteContacto: '/api/clienteContacto',
            clienteCategoria: '/api/clienteCategoria',
            clienteCanal: '/api/clienteCanal',
            clienteZona: '/api/clienteZona',
            atributoTecnicoVariedad: '/api/atributoTecnicoVariedad',
            atributoTecnicoVariedadValor: '/api/atributoTecnicoVariedadValor',
            atributoTecnicoNegocio: '/api/atributoTecnicoNegocio',
            variable: '/api/variable',
            categoriaAtributoTecnico: '/api/categoriaAtributoTecnico',
            categoriaAtributoTecnicoValor: '/api/categoriaAtributoTecnicoValor',
            frecuencia: '/api/frecuencia',
            atributoFuncionalVariedad: '/api/atributoFuncionalVariedad',
            tipoEstudio: '/api/tipoEstudio',
            tipoUnidadMedida: '/api/tipoUnidadMedida',
            unidadMedida: '/api/unidadMedida',
            tipoInformeOrden: '/api/tipoInformeOrden',
            categoriaUnidadVenta: '/api/categoriaUnidadVenta',
            contrato: '/api/contrato',
            contratoDetalle: '/api/contratoDetalle',
            estadoContrato: '/api/estadoContrato',
            contratoHistorial: '/api/contratoHistorial',
            contratoVariable: '/api/contratoVariable',
            contratoUnidadVenta: '/api/contratoUnidadVenta',
            contratoMes: '/api/contratoMes',
            clasificadoReferencia: '/api/clasificadoReferencia',
            unidadVenta: '/api/unidadVenta',
            skuAtributoTecnicoVariedadValor: '/api/skuAtributoTecnicoVariedadValor',
            agrupacionZonas: '/api/agrupacionZonas',
            agrupacionZonasDetalle: '/api/agrupacionZonasDetalle',
            atributoFuncionalVariedadValor: '/api/atributoFuncionalVariedadValor',
            clienteFiltro: '/api/clienteFiltro',
            atributoFuncionalVariedadValorValor: '/api/atributoFuncionalVariedadValorValor',
            clienteFormula: '/api/clienteFormula',
            clienteConcatenacion: '/api/clienteConcatenacion',
            
        };

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
        for (const [key, value] of Object.entries(this.paths)) {
            this.app.use(value, require(`../routes/${key}`));
        }


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
