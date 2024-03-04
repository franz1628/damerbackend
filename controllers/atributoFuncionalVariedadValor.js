const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { where, Op, Sequelize } = require('sequelize');
const { CategoriaAtributoTecnico } = require('../models/categoriaAtributoTecnico');
const { AtributoFuncionalVariedadValor } = require('../models/atributoFuncionalVariedadValor');
const { AtributoFuncionalVariedad } = require('../models/atributoFuncionalVariedad');

const get = async (req = request, res = response) => {
    const model_all = await AtributoFuncionalVariedadValor.findAll({
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

const postIdAtributoFuncionalVariedad = async (req = request, res = response) => {
    const model = await AtributoFuncionalVariedadValor.findAll({
        where: {
            estado: 1,
            idAtributoFuncionalVariedad : req.body.idAtributoFuncionalVariedad
        },
        include : {model:AtributoFuncionalVariedad,as:'AtributoFuncionalVariedad'}
    })
    

    res.json(
        model
    );
}

const post = async (req, res = response) => {
    delete req.body.id;
    const model = new AtributoFuncionalVariedadValor(req.body);

    // Guardar en BD
    await model.save();

    res.json({
        model
    });
}


const put = async (req, res = response) => {

    const { id } = req.params;

    delete req.body.id;

    const model = await AtributoFuncionalVariedadValor.update(req.body, {
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
        msg: 'patch API - AtributoFuncionalVariedadValorPatch'
    });
}

const deleted = async (req, res = response) => {
    const { id } = req.params;

    const model = await AtributoFuncionalVariedadValor.update({
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
    postIdAtributoFuncionalVariedad,
    post,
    put,
    patch,
    deleted,
}