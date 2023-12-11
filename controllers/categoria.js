const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');
const { Categoria } = require('../models/categoria');

const get = async (req = request, res = response) => {
    const model_all = await Categoria.findAll({
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
    console.log('etjej');
    delete req.body.id;
    const model = new Categoria(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}

const postCanastaMegaCategoria = async (req, res = response) => {

    const { codCanasta,codMegaCategoria } = req.body;

    const model_all = await Categoria.findAll({
        where: {
            estado: 1,
            codCanasta:codCanasta,
            codMegaCategoria:codMegaCategoria,
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

    const model = await Categoria.update(req.body, {
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
        msg: 'patch API - CategoriaPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await Categoria.update({
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
    postCanastaMegaCategoria,
    put,
    patch,
    deleted,
}