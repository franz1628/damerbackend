const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');
const { ClienteContacto } = require('../models/clienteContacto');

const get = async (req = request, res = response) => {
    const model_all = await ClienteContacto.findAll({
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
    const model_all = await ClienteContacto.findAll({
        where: {
            estado: 1,
            idCliente:req.params.idCliente
        }
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const postCodigo = async (req = request, res = response) => {
    const model = await ClienteContacto.findOne({
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
    const model = new ClienteContacto(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}


const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await ClienteContacto.update(req.body, {
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
        msg: 'patch API - ClienteContactoPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await ClienteContacto.update({
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
    postCodigo,
    post,
    put,
    patch,
    deleted,
}