const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');
const { Canasta } = require('../models/canasta');

const get = async (req = request, res = response) => {
    const model_all = await Canasta.findAll({
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

    const model_all = await Canasta.findAll({
        where: {
            estado: 1,
            codigo:codigo
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
    const model = new Canasta(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}



const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await Canasta.update(req.body, {
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
        msg: 'patch API - CanastaPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await Canasta.update({
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