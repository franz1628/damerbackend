const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize, Model } = require('sequelize');
const { Controller } = require('./controller');
const { ClienteAgrupacionCategoria } = require('../models/clienteAgrupacionCategoria');
const { Categoria } = require('../models/categoria');
const { Cliente } = require('../models/cliente');
const { AgrupacionCategoriaCategoria } = require('../models/agrupacionCategoriaCategoria');
const { AgrupacionZonaZona } = require('../models/agrupacionZonaZona');
const { ClienteAgrupacionCanal } = require('../models/clienteAgrupacionCanal');
const { AgrupacionCanalCanal } = require('../models/agrupacionCanalCanal');
const { Canal } = require('../models/canal');
const { AgrupacionCanals } = require('../models/agrupacionCanals');

const control = Controller(ClienteAgrupacionCanal);

control.postIdCliente = async (req = request, res = response) => {
    const model_all = await ClienteAgrupacionCanal.findAll({
        where: {
            estado: 1,
            idCliente: req.body.idCliente
        },
        include: [
           {
            model:AgrupacionCanals,
            as:'AgrupacionCanals'
           }
        ]
    });

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}


control.addCanalsNuevo = async (req = request, res = response) => {
    const canals = req.body.canalsAgrupacion

    const model = new ClienteAgrupacionCanal({
        idCliente : req.body.idCliente,
        nombre:req.body.nombreAgrupacionCanal
    });
        
    await model.save();

    for (let i = 0; i < canals.length; i++) {
        const canal = canals[i];

        let miAgrupacionCanal = new AgrupacionCanalCanal({
            idClienteAgrupacionCanal : model.id,
            idCanal : canal.id
        })
        await miAgrupacionCanal.save();
    }

    res.json({
        data: model,
        state: 1,
        message: 'Agrupacion Agregado correactemente'
    });
}

control.editCanals = async (req = request, res = response) => {
    const canals = req.body.canalsAgrupacion
    const idClienteAgrupacionCanal = req.body.idClienteAgrupacionCanal
    
    await ClienteAgrupacionCanal.update(
        {
            nombre:req.body.nombreAgrupacionCanal
        }, {
        where: {
            id: req.body.idClienteAgrupacionCanal,
        }
    });

    await AgrupacionCanalCanal.destroy({
        where : {
            idClienteAgrupacionCanal : idClienteAgrupacionCanal
        }
    })


    for (let i = 0; i < canals.length; i++) {
        const canal = canals[i];

        let miAgrupacionCanal = new AgrupacionCanalCanal({
            idClienteAgrupacionCanal : idClienteAgrupacionCanal,
            idCanal : canal.id
        })
        await miAgrupacionCanal.save();
    }

    res.json({
        data: [],
        state: 1,
        message: 'Agrupacion modificada correactemente'
    });
}



module.exports = control;