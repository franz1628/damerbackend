const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');
const { Negocio } = require('../models/negocio');

const get = async (req = request, res = response) => {
    const model_all = await Negocio.findAll({
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
    const codigo = req.params.codigo;

    const model = await Negocio.findOne({
        where: {
            codigo: codigo
        }
    })

    if(model){
        res.json({
            data: model,
            state: 1,
            message: ''
        });
    }else{
        res.json({
            data: null,
            state: 1,
            message: 'No existe un negocio  con ese codigo'
        });
    }

   
}

const post = async (req, res = response) => {
    delete req.body.id;
    const model = new Negocio(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}

const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await Negocio.update(req.body, {
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
        msg: 'patch API - NegocioPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await Negocio.update({
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