const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');
const { Cliente } = require('../models/cliente');
const { ClienteCategoria } = require('../models/clienteCategoria');
const { Categoria } = require('../models/categoria');

const get = async (req = request, res = response) => {
    const model_all = await ClienteCategoria.findAll({
        where: {
            estado: 1
        }
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const getCodCliente = async (req = request, res = response) => {
    const model_all = await ClienteCategoria.findAll({
        where: {
            estado: 1,
            codCliente: req.params.codCliente
        },
        include: [
            {
                model: Categoria,
                as: 'Categoria',
                foreignKey: 'codigo'
            },
            {
                model: Cliente,
                as: 'Cliente',
                foreignKey: 'codigo'
            }
        ]
    });

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const postCodigo = async (req = request, res = response) => {
    const model = await ClienteCategoria.findOne({
        where: {
            estado: 1,
            codigo : req.body.codigo
        }
    })

    res.json(
        model
    );
}

const postIdCliente = async (req = request, res = response) => {
    const model_all = await ClienteCategoria.findAll({
        where: {
            estado: 1,
            idCliente: req.body.idCliente
        },
        include: [
            {
                model: Categoria,
                as: 'Categoria'
            },
            {
                model: Cliente,
                as: 'Cliente'
            }
        ]
    });

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const post = async (req, res = response) => {
    delete req.body.id;
    const model = new ClienteCategoria(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}


const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await ClienteCategoria.update(req.body, {
        where: {
            id: id,
        }
    });

    res.json({
        data: [model],
        state: 1,
        message: 'Actualizado correctamente'
    });
}

const patch = (req, res = response) => {
    res.json({
        msg: 'patch API - ClienteCategoriaPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await ClienteCategoria.update({
        estado: false,
    }, {
        where: {
            id: id,
        }
    });

    res.json({
        data: [],
        state: 1,
        message: 'Borrado correctamente'
    });
}

module.exports = {
    get,
    postIdCliente,
    getCodCliente,
    postCodigo,
    post,
    put,
    patch,
    deleted,
}