const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');
const { MegaCategoria } = require('../models/megaCategoria');

const get = async (req = request, res = response) => {
    const model_all = await MegaCategoria.findAll({
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

const getCodigo = async (req = request, res = response) => {
    const { codigo } = req.params;
    console.log(codigo);
    const model_all = await MegaCategoria.findAll({
        where: {
            estado: 1,
            codCanasta:codigo
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
    const model = new MegaCategoria(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}

const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await MegaCategoria.update(req.body, {
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
        msg: 'patch API - MegaCategoriaPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await MegaCategoria.update({
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
    getCodigo,
    post,
    put,
    patch,
    deleted,
}