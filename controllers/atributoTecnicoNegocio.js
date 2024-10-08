const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where } = require('sequelize');
const { AtributoTecnicoNegocio } = require('../models/atributoTecnicoNegocio');

const get = async (req = request, res = response) => {
    const model_all = await AtributoTecnicoNegocio.findAll({
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

const postCodigo = async (req = request, res = response) => {
    const model = await AtributoTecnicoNegocio.findOne({
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
    const model = new AtributoTecnicoNegocio(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}


const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await AtributoTecnicoNegocio.update(req.body, {
        where: {
            id: id,
        },
        individualHooks: true
    });

    res.json({
        data: [model],
        state: 1,
        message: 'Actualizado correctamente'
    });
}

const patch = (req, res = response) => {
    res.json({
        msg: 'patch API - AtributoTecnicoNegocioPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await AtributoTecnicoNegocio.update({
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
    postCodigo,
    post,
    put,
    patch,
    deleted,
}