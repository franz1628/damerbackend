const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');
const { Cliente } = require('../models/cliente');
const { AtributoFuncionalVariedad } = require('../models/atributoFuncionalVariedad');
const { Categoria } = require('../models/categoria');
const { ClienteAgrupacionCategoria } = require('../models/clienteAgrupacionCategoria');

const get = async (req = request, res = response) => {
    const model_all = await AtributoFuncionalVariedad.findAll({
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

const getIdClienteIdCategoria = async (req = request, res = response) => {
    const model_all = await AtributoFuncionalVariedad.findAll({
        where: {
            estado: 1,
            idClienteAgrupacionCategoria: req.params.idClienteAgrupacionCategoria,
        },
        include: [
            {
                model: ClienteAgrupacionCategoria,
                as: 'ClienteAgrupacionCategoria'
            }
        ]
    });

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const getIdClienteAgrupacionCategoria = async (req = request, res = response) => {
    const model_all = await AtributoFuncionalVariedad.findAll({
        where: {
            estado: 1,
            idClienteAgrupacionCategoria: req.params.idClienteAgrupacionCategoria,
        },
        include: [
            {
                model: ClienteAgrupacionCategoria,
                as: 'ClienteAgrupacionCategoria'
            }
        ]
    });

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}


const postIdClienteIdCategoria = async (req = request, res = response) => {
    const model_all = await AtributoFuncionalVariedad.findAll({
        where: {
            estado: 1,
            idCliente : req.body.idCliente,
            idCategoria : req.body.idCategoria
        }
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}


const postIdClienteAgrupacionCategoria = async (req = request, res = response) => {
    const model_all = await AtributoFuncionalVariedad.findAll({
        where: {
            estado: 1,
            idClienteAgrupacionCategoria : req.body.idClienteAgrupacionCategoria
        }
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const post = async (req, res = response) => {
    delete req.body.id;
    const model = new AtributoFuncionalVariedad(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}


const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await AtributoFuncionalVariedad.update(req.body, {
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
        msg: 'patch API - AtributoFuncionalVariedadPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await AtributoFuncionalVariedad.update({
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
    getIdClienteIdCategoria,
    getIdClienteAgrupacionCategoria,
    postIdClienteIdCategoria,
    postIdClienteAgrupacionCategoria,
    post,
    put,
    patch,
    deleted,
}