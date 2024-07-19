const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');
const { Cliente } = require('../models/cliente');
const { ClienteZona } = require('../models/clienteZona');
const { Zona } = require('../models/zona');

const get = async (req = request, res = response) => {
    const model_all = await ClienteZona.findAll({
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

const getIdCliente = async (req = request, res = response) => {
    const model_all = await ClienteZona.findAll({
        where: {
            estado: 1,
            idCliente: req.params.idCliente
        },
        include: [
            {
                model: Zona,
                as: 'Zona'
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
    const model = await ClienteZona.findOne({
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
    const model_all = await ClienteZona.findAll({
        where: {
            estado: 1,
            idCliente: req.body.idCliente
        },
        include: [
            {
                model: Zona,
                as: 'Zona'
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
    const model = new ClienteZona(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}


const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await ClienteZona.update(req.body, {
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
        msg: 'patch API - ClienteZonaPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await ClienteZona.update({
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
    getIdCliente,
    postIdCliente,
    postCodigo,
    post,
    put,
    patch,
    deleted,
}