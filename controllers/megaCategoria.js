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

const getId = async (req = request, res = response) => {
    const { id } = req.params;
    const model_all = await MegaCategoria.findAll({
        where: {
            estado: 1,
            idCanasta:id
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

const postId = async (req = request, res = response) => {
    const model = await MegaCategoria.findOne({
        where: {
            estado: 1,
            id : req.body.id
        }
    })

    res.json(
        model
    );
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
    postId,
    getId,
    post,
    put,
    patch,
    deleted,
}