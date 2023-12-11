const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');
const { Sku } = require('../models/sku');

const get = async (req = request, res = response) => {
    const model_all = await Sku.findAll({
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

const post = async (req, res = response) => {
    delete req.body.id;
    const model = new Sku(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}

const postByCategoria = async (req, res = response) => {

    const { codCanasta, codMegaCategoria, codCategoria } = req.body;

    const model_all = await Sku.findAll({
        where: {
            estado: 1,
            codCanasta:codCanasta,
            codMegaCategoria:codMegaCategoria,
            codCategoria:codCategoria,
        }
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await Sku.update(req.body, {
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
        msg: 'patch API - SkuPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await Sku.update({
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
    post,
    postByCategoria,
    put,
    patch,
    deleted,
}