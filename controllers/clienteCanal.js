const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');
const { Cliente } = require('../models/cliente');
const { ClienteCanal } = require('../models/clienteCanal');
const { Canal } = require('../models/canal');

const get = async (req = request, res = response) => {
    const model_all = await ClienteCanal.findAll({
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
    const model_all = await ClienteCanal.findAll({
        where: {
            estado: 1,
            codCliente: req.params.codCliente
        },
        include: [
            {
                model: Canal,
                as: 'Canal'
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

const postCodigo = async (req = request, res = response) => {
    const model = await ClienteCanal.findOne({
        where: {
            estado: 1,
            codigo : req.body.codigo
        }
    })

    res.json(
        model
    );
}

const post = async (req, res = response) => {
    delete req.body.id;
    const model = new ClienteCanal(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}


const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await ClienteCanal.update(req.body, {
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
        msg: 'patch API - ClienteCanalPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await ClienteCanal.update({
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
    getCodCliente,
    postCodigo,
    post,
    put,
    patch,
    deleted,
}