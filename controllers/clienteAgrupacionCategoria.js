const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize, Model } = require('sequelize');
const { Controller } = require('./controller');
const { ClienteAgrupacionCategoria } = require('../models/clienteAgrupacionCategoria');
const { Categoria } = require('../models/categoria');
const { Cliente } = require('../models/cliente');
const { AgrupacionCategoriaCategoria } = require('../models/agrupacionCategoriaCategoria');

const control = Controller(ClienteAgrupacionCategoria);

control.postIdCliente = async (req = request, res = response) => {
    const model_all = await ClienteAgrupacionCategoria.findAll({
        where: {
            estado: 1,
            idCliente: req.body.idCliente
        },
        include: [
           {
            model:AgrupacionCategoriaCategoria,
            as:'AgrupacionCategoriaCategoria',
            include : [
                {
                    model:Categoria,
                    as:'Categoria'
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


control.addCategoriasNuevo = async (req = request, res = response) => {
    const categorias = req.body.categoriasAgrupacion

    const model = new ClienteAgrupacionCategoria({
        idCliente : req.body.idCliente
    });
        
    await model.save();

    for (let i = 0; i < categorias.length; i++) {
        const categoria = categorias[i];

        let miAgrupacionCategoria = new AgrupacionCategoriaCategoria({
            idClienteAgrupacionCategoria : model.id,
            idCategoria : categoria.id
        })
        await miAgrupacionCategoria.save();
    }

    res.json({
        data: model,
        state: 1,
        message: 'Agrupacion Agregado correactemente'
    });
}

control.editCategorias = async (req = request, res = response) => {
    const categorias = req.body.categoriasAgrupacion
    const idClienteAgrupacionCategoria = req.body.idClienteAgrupacionCategoria

    await AgrupacionCategoriaCategoria.destroy({
        where : {
            idClienteAgrupacionCategoria : idClienteAgrupacionCategoria
        }
    })


    for (let i = 0; i < categorias.length; i++) {
        const categoria = categorias[i];

        let miAgrupacionCategoria = new AgrupacionCategoriaCategoria({
            idClienteAgrupacionCategoria : idClienteAgrupacionCategoria,
            idCategoria : categoria.id
        })
        await miAgrupacionCategoria.save();
    }

    res.json({
        data: [],
        state: 1,
        message: 'Agrupacion modificada correactemente'
    });
}



module.exports = control;