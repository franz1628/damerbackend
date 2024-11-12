const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize, Model } = require('sequelize');
const { Controller } = require('./controller');
const { ClienteAgrupacionCategoria } = require('../models/clienteAgrupacionCategoria');
const { Categoria } = require('../models/categoria');
const { Cliente } = require('../models/cliente');
const { AgrupacionCategoriaCategoria } = require('../models/agrupacionCategoriaCategoria');
const { AgrupacionZonaZona } = require('../models/agrupacionZonaZona');
const { ClienteAgrupacionZona } = require('../models/clienteAgrupacionZona');
const { Zona } = require('../models/zona');

const control = Controller(ClienteAgrupacionZona);

control.postIdCliente = async (req = request, res = response) => {
    const model_all = await ClienteAgrupacionZona.findAll({
        where: {
            estado: 1,
            idCliente: req.body.idCliente
        },
        include: [
           {
            model:AgrupacionZonaZona,
            as:'AgrupacionZonaZona',
            include : [
                {
                    model:Zona,
                    as:'Zona'
                }
            ]
           }
        ]
    });

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}


control.addZonasNuevo = async (req = request, res = response) => {
    const zonas = req.body.zonasAgrupacion

    const model = new ClienteAgrupacionZona({
        idCliente : req.body.idCliente,
        nombre:req.body.nombreAgrupacionZona
    });
        
    await model.save();

    for (let i = 0; i < zonas.length; i++) {
        const zona = zonas[i];

        let miAgrupacionZona = new AgrupacionZonaZona({
            idClienteAgrupacionZona : model.id,
            idZona : zona.id
        })
        await miAgrupacionZona.save();
    }

    res.json({
        data: model,
        state: 1,
        message: 'Agrupacion Agregado correactemente'
    });
}

control.editZonas = async (req = request, res = response) => {
    const zonas = req.body.zonasAgrupacion
    const idClienteAgrupacionZona = req.body.idClienteAgrupacionZona
    
    await ClienteAgrupacionZona.update(
        {
            nombre:req.body.nombreAgrupacionZona
        }, {
        where: {
            id: req.body.idClienteAgrupacionZona,
        }
    });

    await AgrupacionZonaZona.destroy({
        where : {
            idClienteAgrupacionZona : idClienteAgrupacionZona
        }
    })


    for (let i = 0; i < zonas.length; i++) {
        const zona = zonas[i];

        let miAgrupacionZona = new AgrupacionZonaZona({
            idClienteAgrupacionZona : idClienteAgrupacionZona,
            idZona : zona.id
        })
        await miAgrupacionZona.save();
    }

    res.json({
        data: [],
        state: 1,
        message: 'Agrupacion modificada correactemente'
    });
}



module.exports = control;