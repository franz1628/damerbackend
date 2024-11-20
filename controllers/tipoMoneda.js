const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { TipoMoneda } = require('../models/tipoMoneda');

const get = async (req = request, res = response) => {
    const model_all = await TipoMoneda.findAll({
        where: {
            estado: 1,
        }
    })

    res.json({
        data: model_all,
        state: 1,
        message: ''
    });
}

const getById = async (req = request, res = response) => {
    let model = await TipoMoneda.findOne({
        where: {
            estado: 1,
            id:req.params.id
        }
    })

    res.json({
        data: model,
        state: 1,
        message: ''
    });
}

const postCodigo = async (req = request, res = response) => {
    const model = await TipoMoneda.findOne({
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
    const model = new TipoMoneda(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}


const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await TipoMoneda.update(req.body, {
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
        msg: 'patch API - TipoEstudioPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await TipoMoneda.update({
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
    getById,
    postCodigo,
    post,
    put,
    patch,
    deleted,
}