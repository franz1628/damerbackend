const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');
const { AtributoTecnicoVariedadValor } = require('../models/atributoTecnicoVariedadValor');
const { AtributoTecnicoVariedad } = require('../models/atributoTecnicoVariedad');

const get = async (req = request, res = response) => {
    const model_all = await AtributoTecnicoVariedadValor.findAll({
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

const postIdAtributoTecnicoVariedad = async (req = request, res = response) => {
    const model = await AtributoTecnicoVariedadValor.findAll({
        where: {
            estado: 1,
            idAtributoTecnicoVariedad : req.body.idAtributoTecnicoVariedad
        },
        include : {model:AtributoTecnicoVariedad,foreignKey:'id'}
    })
    

    res.json(
        model
    );
}

const post = async (req, res = response) => {
    delete req.body.id;
    const model = new AtributoTecnicoVariedadValor(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}


const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await AtributoTecnicoVariedadValor.update(req.body, {
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
        msg: 'patch API - AtributoTecnicoVariedadValorPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await AtributoTecnicoVariedadValor.update({
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
    postIdAtributoTecnicoVariedad,
    post,
    put,
    patch,
    deleted,
}