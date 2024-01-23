const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');
const { Cliente } = require('../models/cliente');
const { AtributoFuncionalVariedad } = require('../models/atributoFuncionalVariedad');
const { Categoria } = require('../models/categoria');

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

const getCodClienteCodCategoria = async (req = request, res = response) => {
    const model_all = await AtributoFuncionalVariedad.findAll({
        where: {
            estado: 1,
            codCliente: req.params.codCliente,
            codCategoria: req.params.codCategoria,
        },
        include: [
            {
                model: Categoria,
                as: 'Categoria',
                foreignKey: 'codigo'
            },
            {
                model: Cliente,
                as: 'Cliente',
                foreignKey: 'codigo'
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
    const model = await AtributoFuncionalVariedad.findOne({
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
    getCodClienteCodCategoria,
    postCodigo,
    post,
    put,
    patch,
    deleted,
}